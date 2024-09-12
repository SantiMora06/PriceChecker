const router = require("express").Router()
const apiKey = process.env.apiKey;

const validInterval = ["daily", "weekly", "monthly"];
const validCommodities = {
    "crude-oil-wti": "WTI",
    "crude-oil-brent": "BRENT",
    "natural-gas": "NATURAL_GAS",
    "copper": "COPPER",
    "aluminium": "ALUMINIUM",
    "wheat": "WHEAT",
    "sugar": "SUGAR",
    "cotton": "COTTON",
    "corn": "CORN",
    "coffee": "COFFEE",
    "all": "ALL_COMMODITIES"
};

// We create a dymanic route for commodities
router.get("/price/:commodity/:interval", async (req, res) => {
    const { commodity, interval } = req.params;

    // We need to validate the interval
    if (!validInterval.includes(interval)) {
        return res.status(400).json({ error: "Invalid interval. Please use daily, weekly, or monthly." });
    }

    // We need to also validate the commodity selected
    const commodityFunction = validCommodities[commodity];
    if (!commodityFunction) {
        return res.status(400).json({ error: "Invalid commodity. Please provide a valid commodity type." });
    }

    try {
        // In here we make the fetch request with dynamic parameters such as commodityFunction, interval and apiKey
        const response = await fetch(`https://www.alphavantage.co/query?function=${commodityFunction}&interval=${interval}&apikey=${apiKey}`);
        const data = await response.json();

        // Send the data to the client
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage." });
    }
});

module.exports = router;