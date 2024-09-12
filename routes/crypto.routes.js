const router = require("express").Router()
const apiKey = process.env.apiKey;

router.get('/:from_currency-:to_currency', async (req, res) => {
    const { from_currency, to_currency } = req.params

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from_currency}&to_currency=${to_currency}&apikey=${apiKey}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });
    }
});

const fetchData = async (timeFrame, symbol, market, apiKey) => {
    const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_${timeFrame.toUpperCase()}&symbol=${symbol}&market=${market}&apikey=${apiKey}`;
    const response = await fetch(url);
    return response.json();
};

// Route for fetching cryptocurrency data
router.get('/:timeFrame/:symbol-:market', async (req, res) => {
    const { timeFrame, symbol, market } = req.params;

    const validTimeFrames = ['daily', 'weekly', 'monthly'];
    if (!validTimeFrames.includes(timeFrame)) {
        return res.status(400).json({ error: 'Invalid time frame. Use daily, weekly, or monthly.' });
    }

    try {
        const data = await fetchData(timeFrame, symbol, market, apiKey);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });
    }
});
module.exports = router;