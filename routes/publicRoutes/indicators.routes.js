const router = require("express").Router()
const Indicators = require("../../models/Indicators.model")
const apiKey = process.env.apiKey

const validParams = {
    interval1: ["annual", "quarterly"], // GDP
    interval2: ["daily", "weekly", "monthly"], // TREASURY_YIELD, FEDERAL_FUNDS_RATE, 
    interval3: ["monthly", "semiannual"], // CPI
    maturity: ["3month", "2year", "5year", "7year", "10year", "30year"]
};

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

const createRouteHandler = (functionType, validateParams) => async (req, res) => {
    const { interval, maturity } = req.params;
    const params = [];

    if (interval) {
        if (!validateParams.interval.includes(interval)) {
            return res.status(400).json({ error: error.message })
        }
        params.push(`interval=${interval}`)
    }

    if (maturity) {
        if (!validateParams.maturity.includes(maturity)) {
            return res.status(400).json({ error: error.message });
        }
        params.push(`maturity=${maturity}`);
    }

    const paramString = params.length > 0 ? params.join('&') : "";

    try {
        // Declaramos una variable que haga de caché. Espera y encuentra un Stock que tenga un símbolo y una función determinada.
        const cachedIndicators = await Indicators.findOne({ functionType, interval, maturity });

        const oneDay = 24 * 60 * 60 * 1000;
        const now = new Date();

        // Si existe y fue actualizado en las últimas 24 horas, devolvemos el símbolo
        if (cachedIndicators && now - cachedIndicators.updatedAt < oneDay) {
            return res.json(cachedIndicators.data)
        }

        // Si no existe o fue consultado hace más de 24 horas, hacemos la petición a la API
        const data = await fetchFromAlphaVantage(functionType, paramString);

        // Guardamos o actualizamos el símbolo en la base de datos
        await Indicators.findOneAndUpdate(
            { functionType },
            { data, updatedAt: new Date() },
            { upsert: true, new: true })
        //Devolvemos todos los datos actualizados
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

router.get('/GDP/:interval', createRouteHandler('REAL_GDP', { interval: validParams.interval1 }));
router.get('/GDP-USA/', createRouteHandler('REAL_GDP_PER_CAPITA', { interval: [] }));
router.get("/treasury-yield/:interval/:maturity", createRouteHandler('TREASURY_YIELD', { interval: validParams.interval2, maturity: validParams.maturity }))
router.get("/federal-funds-rate/:interval", createRouteHandler('FEDERAL_FUNDS_RATE', { inteval: validParams.interval2 }))
router.get("/cpi/:interval", createRouteHandler('CPI', { inteval: validParams.interval3 }))
router.get("/inflation", createRouteHandler('INFLATION', { interval: [] }))
router.get("/retail-sales", createRouteHandler('RETAIL_SALES', { interval: [] }))
router.get("/durables", createRouteHandler('DURABLES', { interval: [] }))
router.get("/unemployment", createRouteHandler('UNEMPLOYMENT', { interval: [] }))
router.get("/nonfarm-payroll", createRouteHandler('NONFARM_PAYROLL', { interval: [] }))

module.exports = router;
