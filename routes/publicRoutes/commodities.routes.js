const router = require("express").Router()
const apiKey = process.env.apiKey;


const fetchCommodities = async () => {
    const data = await fetch(`https://financialmodelingprep.com/api/v3/symbol/available-commodities?apikey=${apiKey}`);
    const response = await data.json();

    const symbols = response.map(crypto => crypto.symbol).slice(0, 5)
    return symbols;
};


router.get("/search/commodities", (req, res) => { // localhost:5005/commodities/search/commodities?query=:commodity
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ Error: "Query parameter is required" });
    }

    const results = commoditySymbols.filter(symbol =>
        symbol.toLowerCase().includes(query.toLowerCase())
    );

    res.json(results);
});

router.get("/all-commodities", async (req, res) => {
    try {
        const data = await fetch(`https://financialmodelingprep.com/api/v3/symbol/available-commodities?apikey=${apiKey}`); //http://localhost:5005/commodities/all-commodities
        const response = await data.json();
        res.json(response)
    } catch (error) {
        res.status(500).json({ Error: "Error" })
    }
})

router.get("/random-commodities", async (req, res) => { //http://localhost:5005/commodities/random-commodities
    try {

        const symbols = await fetchCommodities()
        const datas = await Promise.all(symbols.map(symbol => fetch(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`)))
        const response = await Promise.all(datas.map(data => data.json()))

        const combineData = response.flat().map(commodity => ({ name: commodity.name, symbol: commodity.symbol, price: commodity.price, exchangeRate: commodity.changesPercentage }))

        res.json({ quotes: combineData })

    } catch (error) {
        res.status(500).json({ Error: "Failed to fetch random commodities" })
    }
})

module.exports = router;