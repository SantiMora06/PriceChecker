const router = require('express').Router();
const apiKey = process.env.apiKey;

// Helper function to fetch data from Alpha Vantage API and centralize
// 
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

// Define a route handler with a dynamic function type and we just need to add later the name of the function as 'TIME_SERIES_DAILY'
// to fetch from it.
const createRouteHandler = (functionType) => async (req, res) => {
    const symbol = req.params.symbol || '';
    const params = symbol ? `symbol=${symbol}` : '';

    try {
        const data = await fetchFromAlphaVantage(functionType, params);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Define routes
router.get('/daily/:symbol', createRouteHandler('TIME_SERIES_DAILY'));
router.get('/weekly/:symbol', createRouteHandler('TIME_SERIES_WEEKLY'));
router.get('/weekly-adjusted/:symbol', createRouteHandler('TIME_SERIES_WEEKLY_ADJUSTED'));
router.get('/monthly/:symbol', createRouteHandler('TIME_SERIES_MONTHLY'));
router.get('/monthly-adjusted/:symbol', createRouteHandler('TIME_SERIES_MONTHLY_ADJUSTED'));
router.get('/last-price-and-volume/:symbol', createRouteHandler('GLOBAL_QUOTE'));
router.get('/search/:keywords', async (req, res) => {
    try {
        const data = await fetchFromAlphaVantage('SYMBOL_SEARCH', `keywords=${req.params.keywords}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/market-status', async (req, res) => {
    try {
        const data = await fetchFromAlphaVantage('MARKET_STATUS');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/historical/:symbol', createRouteHandler('HISTORICAL_OPTIONS'));
router.get('/top-gainers', async (req, res) => {
    try {
        const data = await fetchFromAlphaVantage('TOP_GAINERS_LOSERS');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/overview/:symbol', createRouteHandler('OVERVIEW'));
router.get('/etf/:symbol', createRouteHandler('ETF_PROFILE'));
router.get('/dividends/:symbol', createRouteHandler('DIVIDENDS'));
router.get('/split/:symbol', createRouteHandler('SPLITS'));
router.get('/income-statement/:symbol', createRouteHandler('INCOME_STATEMENT'));
router.get('/balance/:symbol', createRouteHandler('BALANCE_SHEET'));
router.get('/cash-flow/:symbol', createRouteHandler('CASH_FLOW'));
router.get('/earnings/:symbol', createRouteHandler('EARNINGS'));
router.get('/ipo-calendar', async (req, res) => {
    try {
        const data = await fetchFromAlphaVantage('IPO_CALENDAR');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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
router.get('/fx-daily/:from_symbol-:to_symbol', async (req, res) => {
    const { from_symbol, to_symbol } = req.params;
    try {
        const data = await fetchFromAlphaVantage('FX_DAILY', `from_symbol=${from_symbol}&to_symbol=${to_symbol}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/fx-weekly/:from_symbol-:to_symbol', async (req, res) => {
    const { from_symbol, to_symbol } = req.params;
    try {
        const data = await fetchFromAlphaVantage('FX_WEEKLY', `from_symbol=${from_symbol}&to_symbol=${to_symbol}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/fx-monthly/:from_symbol-:to_symbol', async (req, res) => {
    const { from_symbol, to_symbol } = req.params;
    try {
        const data = await fetchFromAlphaVantage('FX_MONTHLY', `from_symbol=${from_symbol}&to_symbol=${to_symbol}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
