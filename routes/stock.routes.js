const router = require("express").Router()
const apiKey = 'UKYI48QGI96XRW9G';

// Get daily stock

router.get('/:symbol', async (req, res) => {
    const symbol = req.params.symbol;  // Extracts the stock symbol from the URL params
    // Your Alpha Vantage API key

    try {
        // Fetches data from the Alpha Vantage API for the given stock symbol
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parses the response as JSON
        res.json(data);  // Sends the data back to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handles any errors
    }
});

router.get('/weekly/:symbol', async (req, res) => {
    const symbol = req.params.symbol;  // Extracts the stock symbol from the URL params

    try {
        // Fetches data from the Alpha Vantage API for the given stock symbol
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parses the response as JSON
        res.json(data);  // Sends the data back to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handles any errors
    }
});

router.get('/weekly-adjusted/:symbol', async (req, res) => {
    const symbol = req.params.symbol;  // Extracts the stock symbol from the URL params

    try {
        // Fetches data from the Alpha Vantage API for the given stock symbol
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parses the response as JSON
        res.json(data);  // Sends the data back to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handles any errors
    }
});

router.get('/monthly/:symbol', async (req, res) => {
    const symbol = req.params.symbol;  // Extracts the stock symbol from the URL params

    try {
        // Fetches data from the Alpha Vantage API for the given stock symbol
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parses the response as JSON
        res.json(data);  // Sends the data back to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handles any errors
    }
});

router.get('/monthly-adjusted/:symbol', async (req, res) => {
    const symbol = req.params.symbol;  // Extracts the stock symbol from the URL params

    try {
        // Fetches data from the Alpha Vantage API for the given stock symbol
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parses the response as JSON
        res.json(data);  // Sends the data back to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handles any errors
    }
});

router.get('/last-price-and-volume/:symbol', async (req, res) => {
    const symbol = req.params.symbol;  // Extracts the stock symbol from the URL params

    try {
        // Fetches data from the Alpha Vantage API for the given stock symbol
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parses the response as JSON
        res.json(data);  // Sends the data back to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handles any errors
    }
});

router.get('/search/:keywords', async (req, res) => {
    const keywords = req.params.keywords;  // Extract the search keyword from the URL

    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/market-status', async (req, res) => {

    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/historical/:symbol/', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=HISTORICAL_OPTIONS&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/top-gainers', async (req, res) => {

    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/overview/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/etf/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=ETF_PROFILE&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/dividends/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=DIVIDENDS&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/split/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=SPLITS&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/income-statement/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/balance/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/cash-flow/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/earnings/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/ipo-calendar', async (req, res) => {
    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=IPO_CALENDAR&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/exchange-rate/:from_currency-:to_currency', async (req, res) => {
    const from_currency = req.params.from_currency
    const to_currency = req.params.to_currency

    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from_currency}&to_currency=${to_currency}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/fx-daily/:from_symbol-:to_symbol', async (req, res) => {
    const from_symbol = req.params.from_symbol;
    const to_symbol = req.params.to_symbol;

    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${from_symbol}&to_symbol=${to_symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/fx-weekly/:from_symbol-:to_symbol', async (req, res) => {
    const from_symbol = req.params.from_symbol;
    const to_symbol = req.params.to_symbol;

    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=${from_symbol}&to_symbol=${to_symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});

router.get('/fx-monthly/:from_symbol-:to_symbol', async (req, res) => {
    const from_symbol = req.params.from_symbol;
    const to_symbol = req.params.to_symbol;

    try {
        // Fetch the matching stock symbols from Alpha Vantage
        const response = await fetch(`https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${from_symbol}&to_symbol=${to_symbol}&apikey=${apiKey}`);
        const data = await response.json();  // Parse the response as JSON
        res.json(data);  // Send the search results to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });  // Handle errors
    }
});



module.exports = router