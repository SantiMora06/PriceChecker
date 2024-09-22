const router = require('express').Router();
const apiKey = process.env.apiKey;
const Stock = require("../../models/Stock.model")

// Creamos una función que nos ayude a coger los datos desde la API de Alpha Vantage y centralizarlos. 

const fetchFromAlphaVantage = async (functionType, params = '') => {
    try {
        const url = `https://www.alphavantage.co/query?function=${functionType}&${params}&apikey=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        throw new Error('Error fetching data from Alpha Vantage');
    }
};

// Creamos una función que nos ayude con el resto de rutas que no tienen símbolos.

const handleAlphaVantageRequest = async (res, apiFunction, params = "") => {
    try {
        // Pedimos a la api que nos de el resultado de la ApiFunction y que los parámetros sean una string vacía;
        const data = await fetchFromAlphaVantage(apiFunction, params);
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
/* Creamos una función para que nos ayude con parámetros específicos como from_symbol y to_symbol;
En este caso, from_symbol y to_symbol serían llamados por el req.params, ya que estos son valores dinámicos-
Llama a la API y le pasa la function Type y los parámetros `from_symbol=${from_symbol}&to_symbol=${to_symbol}` */
const handleFromSymbolToSymbol = (functionType) => async (req, res) => {
    const { from_symbol, to_symbol } = req.params;
    const params = `from_symbol=${from_symbol}&to_symbol=${to_symbol}`
    try {
        const data = await fetchFromAlphaVantage(functionType, params);
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Definimos con una función dinámica un gestor de rutas y, más tarde, solo necesitamos añadir el nombre de la función como por ejemplo 'TIME_SERIES_DAILY'
const createRouteHandler = (functionType) => async (req, res) => {
    const symbol = req.params.symbol || '';
    const params = symbol ? `symbol=${symbol}` : '';

    console.log("Query params", { symbol, functionType });

    try {
        // Declaramos una variable que haga de caché. Espera y encuentra un Stock que tenga un símbolo y una función determinada.
        const cachedStock = await Stock.findOne({ symbol, functionType });
        console.log("Cached Stock:", cachedStock)

        const oneDay = 24 * 60 * 60 * 1000;
        const now = new Date();

        // Si existe y fue actualizado en las últimas 24 horas, devolvemos el símbolo
        if (cachedStock && now - cachedStock.updatedAt < oneDay) {
            console.log("Returning cached data for", { symbol, functionType })
            return res.json(cachedStock.data)
        }

        // Si no existe o fue consultado hace más de 24 horas, hacemos la petición a la API
        const data = await fetchFromAlphaVantage(functionType, params);
        console.log("Fetched Data", data)

        // Guardamos o actualizamos el símbolo en la base de datos
        const savedStock = await Stock.findOneAndUpdate(
            { symbol, functionType },
            { data, updatedAt: new Date() },
            { upsert: true, new: true })
        //Devolvemos todos los datos actualizados
        console.log("Saved Stock", savedStock)
        res.json(data);
    } catch (error) {
        console.log("Error handling Alpha Vantage request:", error)
        res.status(500).json({ error: error.message });
    }
};

// Definimos todas las rutas rutas posibles
router.get('/daily/:symbol', createRouteHandler('TIME_SERIES_DAILY'));
router.get('/weekly/:symbol', createRouteHandler('TIME_SERIES_WEEKLY'));
router.get('/weekly-adjusted/:symbol', createRouteHandler('TIME_SERIES_WEEKLY_ADJUSTED'));
router.get('/monthly/:symbol', createRouteHandler('TIME_SERIES_MONTHLY'));
router.get('/monthly-adjusted/:symbol', createRouteHandler('TIME_SERIES_MONTHLY_ADJUSTED'));
router.get('/last-price-and-volume/:symbol', createRouteHandler('GLOBAL_QUOTE'));
router.get('/overview/:symbol', createRouteHandler('OVERVIEW'));
router.get('/etf/:symbol', createRouteHandler('ETF_PROFILE'));
router.get('/dividends/:symbol', createRouteHandler('DIVIDENDS'));
router.get('/split/:symbol', createRouteHandler('SPLITS'));
router.get('/income-statement/:symbol', createRouteHandler('INCOME_STATEMENT'));
router.get('/balance/:symbol', createRouteHandler('BALANCE_SHEET'));
router.get('/cash-flow/:symbol', createRouteHandler('CASH_FLOW'));
router.get('/earnings/:symbol', createRouteHandler('EARNINGS'));
router.get('/historical/:symbol', createRouteHandler('HISTORICAL_OPTIONS'));

// Aquí queremos buscar las keywords, por lo que pedimos a la API que nos busque la palabra clave y cambia dinámicamente.
router.get('/search/:keywords', async (req, res) => {
    try {
        const data = await fetchFromAlphaVantage('SYMBOL_SEARCH', `keywords=${req.params.keywords}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/market-status', (req, res) => {
    handleAlphaVantageRequest(res, "MARKET_STATUS")
});

router.get('/top-gainers', (req, res) => {
    handleAlphaVantageRequest(res, "TOP_GAINERS_LOSERS")
});

router.get('/exchange-rate/:from_currency-:to_currency', async (req, res) => {
    const { from_currency, to_currency } = req.params;
    try {
        const data = await fetchFromAlphaVantage('CURRENCY_EXCHANGE_RATE', `from_currency=${from_currency}&to_currency=${to_currency}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/fx-daily/:from_symbol-:to_symbol', handleFromSymbolToSymbol("FX_DAILY"));
router.get('/fx-weekly/:from_symbol-:to_symbol', handleFromSymbolToSymbol("FX_WEEKLY"));
router.get('/fx-monthly/:from_symbol-:to_symbol', handleFromSymbolToSymbol("FX_MONTHLY"));

module.exports = router;
