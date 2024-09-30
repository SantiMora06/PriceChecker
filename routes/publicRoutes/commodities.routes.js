const router = require("express").Router()
const apiKey = process.env.apiKey;

let commoditySymbols = [];

const fetchCommodities = async () => {
    try {
        const data = await fetch(`https://financialmodelingprep.com/api/v3/symbol/available-commodities?apikey=${apiKey}`);
        const response = await data.json();

        if (Array.isArray(response)) {
            commoditySymbols = response;
        } else {
            console.log("Unexpected response format:", response);
        }
    } catch (error) {
        console.error("Error fetching commodities:", error);
    }
};

// Call the function when the server starts
fetchCommodities();

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
        if (commoditySymbols.length < 5) return res.status(400).json({ Error: "Not enough commodities available" })

        const randomCommodities = commoditySymbols.sort(() => 0.5 - Math.random()).slice(0, 5);

        console.log(randomCommodities)
        res.json(randomCommodities)

    } catch (error) {
        res.status(500).json({ Error: "Failed to fetch random commodities" })
    }
})

module.exports = router;