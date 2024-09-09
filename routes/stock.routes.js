const router = require("express").Router()

router.get('/api/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;  // Extracts the stock symbol from the URL params
    const apiKey = 'UKYI48QGI96XRW9G';  // Your Alpha Vantage API key

    try {
        // Fetches data from the Alpha Vantage API for the given stock symbol
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parses the response as JSON
        res.json(data);  // Sends the data back to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handles any errors
    }
});

module.exports = router