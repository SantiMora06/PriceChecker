const router = require("express").Router();
const apiKey = process.env.apiKey;

const fetchCryptos = async () => {

    const data = await fetch(`https://financialmodelingprep.com/api/v3/symbol/available-cryptocurrencies?apikey=${apiKey}`);
    const response = await data.json();

    const symbols = response.map(crypto => crypto.symbol).slice(0, 5)
    return symbols;
};


router.get("/random-cryptos", async (req, res) => {
    try {
        const symbols = await fetchCryptos()
        const responses = await Promise.all(symbols.map(symbol => fetch(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`)))

        const data = await Promise.all(responses.map(response => response.json()))

        const combineData = data.flat().map(crypto => ({ name: crypto.name, symbol: crypto.symbol, price: crypto.price, exchangeRate: crypto.changesPercentage }))

        res.json({ quotes: combineData });
    } catch (error) {
        res.status(500).json({ Error: "Failed to fetch random cryptos" });
    }
});

router.get("/:symbol", async (req, res) => {
    const { symbol } = req.params;
    try {
        const data = await fetch(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`);
        const response = await data.json();
        res.json(response);
    } catch (error) {
        res.status(500).json({ Error: `Failed to fetch ${symbol}` });
    }
});

router.get("/all-cryptos", async (req, res) => {
    try {
        const data = await fetch(`https://financialmodelingprep.com/api/v3/symbol/available-cryptocurrencies?apikey=${apiKey}`)
        const response = await data.json()
        res.json(response)
    } catch (error) {
        res.status(500).json({ Error: "Failed to fetch all cryptos" })
    }
})

module.exports = router;
