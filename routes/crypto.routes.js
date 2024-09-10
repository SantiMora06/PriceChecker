const router = require("express").Router()
const apiKey = 'UKYI48QGI96XRW9G';

router.get('/:from_currency-:to_currency', async (req, res) => {
    const from_currency = req.params.from_currency;
    const to_currency = req.params.to_currency;

    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from_currency}&to_currency=${to_currency}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/daily/:symbol-:market', async (req, res) => {
    const symbol = req.params.symbol;
    const market = req.params.market;

    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=${market}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/weekly/:symbol-:market', async (req, res) => {
    const symbol = req.params.symbol;
    const market = req.params.market;

    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${symbol}&market=${market}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/monthly/:symbol-:market', async (req, res) => {
    const symbol = req.params.symbol;
    const market = req.params.market;

    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=${symbol}&market=${market}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

module.exports = router;