const router = require("express").Router()
const apiKey = process.env.apiKey;

// Constants for validation
const validFunctionType = {
    "gdp": "REAL_GDP",
    "gpd-usa": "REAL_GDP_PER_CAPITA",
    "inflation": "INFLATION",
    "retail-sales": "RETAIL_SALES",
    "durables": "DURABLES",
    "unemployment": "UNEMPLOYMENT",
    "non-farm-payroll": "NONFARM_PAYROLL"
};
const validInterval = ["daily", "weekly", "monthly"];
const valid2Interval = ["annual", "quarterly"];
const validMaturity = ["3month", "2year", "5year", "7year", "10year", "30year"];

// Helper function to fetch data from Alpha Vantage
const fetchData = async (functionType, params, res) => {
    try {
        const urlParams = new URLSearchParams({ apikey: apiKey, ...params });
        const url = `https://www.alphavantage.co/query?function=${functionType}&${urlParams.toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" });
    }
};

// Route handler for GDP and related functions
router.get("/GDP/:interval", (req, res) => {
    const { interval } = req.params;

    if (!valid2Interval.includes(interval)) {
        return res.status(400).json({ error: "Invalid input, please use annual or quarterly" });
    }

    fetchData("REAL_GDP", { interval }, res);
});

router.get("/GDP-USA", (req, res) => {
    fetchData("REAL_GDP_PER_CAPITA", {}, res);
});

// Route handler for treasury yield
router.get("/treasury-yield/:interval/:maturity", (req, res) => {
    const { interval, maturity } = req.params;

    if (!validInterval.includes(interval)) {
        return res.status(400).json({ error: "Invalid interval, use daily, weekly, or monthly" });
    }

    if (!validMaturity.includes(maturity)) {
        return res.status(400).json({ error: "Invalid maturity, use 3month, 2year, 5year, 7year, 10year, or 30year" });
    }

    fetchData("TREASURY_YIELD", { interval, maturity }, res);
});

// Route handler for federal funds rate
router.get("/federal-funds-rate/:interval", (req, res) => {
    const { interval } = req.params;

    if (!validInterval.includes(interval)) {
        return res.status(400).json({ error: "Invalid interval, use daily, weekly, or monthly" });
    }

    fetchData("FEDERAL_FUNDS_RATE", { interval }, res);
});

// Route handler for CPI
router.get("/cpi/:interval", (req, res) => {
    const { interval } = req.params;

    if (!validInterval.includes(interval)) {
        return res.status(400).json({ error: "Invalid interval, use daily, weekly, or monthly" });
    }

    fetchData("CPI", { interval }, res);
});

// General route handler for economic indicators
router.get("/:indicator", (req, res) => {
    const { indicator } = req.params;

    if (!validFunctionType[indicator]) {
        return res.status(400).json({ error: "Invalid indicator" });
    }

    fetchData(validFunctionType[indicator], {}, res);
});

module.exports = router;
