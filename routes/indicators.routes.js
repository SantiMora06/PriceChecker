const router = require("express").Router()
const Indicators = require("../models/Indicators.model")
const cacheMiddleware = require("../middleware/cache.middleware");
const { fetchFromAlphaVantage } = require("../helpers/fetchHelper")

const getSymbolParams = req => {
    const { symbol } = req.params;
    return { symbol }
}

// Route handler for GDP and related functions
router.get("/GDP/:interval", cacheMiddleware(Indicators, "REAL_GDP", getSymbolParams), async (req, res) => {

    try {
        const data = await fetchFromAlphaVantage("REAL_GDP", req.apiParams);
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.get("/GDP-USA", cacheMiddleware(Indicators, "REAL_GDP_PER_CAPITA", getSymbolParams), async (req, res) => {
    try {
        const data = await fetchFromAlphaVantage("REAL_GDP_PER_CAPITA", req.apiParams);
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

});

// Route handler for treasury yield
router.get("/treasury-yield/:interval/:maturity", cacheMiddleware(Indicators, "TREASURY_YIELD", getSymbolParams), async (req, res) => {
    try {
        const data = await fetchFromAlphaVantage("TREASURY_YIELD", req.apiParams);
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// Route handler for federal funds rate
router.get("/federal-funds-rate/:interval", cacheMiddleware(Indicators, "FEDERAL_FUNDS_RATE", getSymbolParams), async (req, res) => {

    try {
        const data = await fetchFromAlphaVantage("FEDERAL_FUNDS_RATE", req.apiParams);
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

});

// Route handler for CPI
router.get("/cpi/:interval", cacheMiddleware(Indicators, "CPI", getSymbolParams), async (req, res) => {

    try {
        const data = await fetchFromAlphaVantage("INFLATION", req.apiParams);
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// General route handler for economic indicators
router.get("/inflation", cacheMiddleware(Indicators, "INFLATION", getSymbolParams), async (req, res) => {

    try {
        const data = await fetchFromAlphaVantage("INFLATION", req.apiParams);
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});





module.exports = router;
