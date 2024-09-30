const router = require('express').Router();
const apiKey = process.env.apiKey;

// Creamos una función que nos ayude a coger los datos desde la API de Alpha Vantage y centralizarlos. 


// Create a general Search out of this URL
// https://financialmodelingprep.com/api/v3/search?query=AA&apikey=zNgZW1xV8xnjHKlwG68JlUNqotDhrMab


let stockSymbols = [];

// Fetch stock symbols on server startup
const fetchStock = async () => {
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/stock/list?apikey=${apiKey}`);
        const data = await response.json();
        if (Array.isArray(data)) {
            stockSymbols = data; // Store the fetched stock data
        } else {
            console.log("Unexpected response format:", data);
        }
    } catch (error) {
        console.error("Error while fetching stock:", error);
    }
};
fetchStock();

// Stock list endpoint
router.get("/stock/list", async (req, res) => {
    try {
        res.json(stockSymbols);
    } catch (error) {
        res.status(500).json({ Error: "Error while fetching the stock list" });
    }
});

// Endpoint for random stocks
router.get("/random-stock", async (req, res) => {
    try {
        if (stockSymbols.length < 5) return res.status(400).json({ Error: "Not enough stocks available" });
        const randomStocks = stockSymbols.sort(() => 0.5 - Math.random()).slice(0, 5);
        res.json(randomStocks);
    } catch (error) {
        res.status(500).json({ Error: "Failed to fetch random stocks" });
    }
});

// ETF list endpoint
router.get("/etf/list", async (req, res) => {
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/etf/list?apikey=${apiKey}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ Error: "Error while fetching the ETF list" });
    }
});

// Stock profile by symbol
router.get("/stock/:symbol", async (req, res) => {
    const { symbol } = req.params;
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ Error: "Error while fetching the stock profile" });
    }
});

// Image by symbol
router.get("/image/:symbol", async (req, res) => {
    const { symbol } = req.params;
    try {
        const response = await fetch(`https://financialmodelingprep.com/image-stock/${symbol}.png?apikey=${apiKey}`);
        const buffer = await response.arrayBuffer();
        res.set("Content-Type", "image/png");
        res.send(Buffer.from(buffer));
    } catch (error) {
        res.status(500).json({ Error: "Error while fetching the image of the asset" });
    }
});

// Analyst recommendations
router.get("/analyst-recommendations/:symbol", async (req, res) => {
    const { symbol } = req.params;
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/analyst-stock-recommendations/${symbol}?apikey=${apiKey}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ Error: "Error while fetching analyst recommendations" });
    }
});

// Company profile endpoint
router.get("/profile/:symbol", async (req, res) => {
    const { symbol } = req.params;
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ Error: "Error while fetching the company's profile data" });
    }
});

// Employee count endpoint
router.get("/employee_count/:symbol", async (req, res) => {
    const { symbol } = req.params;
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/historical/employee_count/${symbol}?apikey=${apiKey}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ Error: "Error while fetching the employee count" });
    }
});

// Stock screener endpoint
router.get("/stock-screener", async (req, res) => {
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/stock-screener?apikey=${apiKey}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ Error: "Error while fetching the stock screener data" });
    }
});

module.exports = router;
