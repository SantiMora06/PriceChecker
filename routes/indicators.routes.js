const router = require("express").Router()
const apiKey = process.env.apiKey;

router.get("/GDP/:interval", async (req, res) => {
    const interval = req.params.interval

    const validInterval = ["annual", "quarterly"]
    if (!validInterval.includes(interval)) {
        return res.status(500).json({ error: "Invalid input, please use annual or quarterly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=REAL_GDP&interval=${interval}&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});


router.get("/GDP-USA", async (req, res) => {

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=REAL_GDP_PER_CAPITA&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});

router.get("/treasury-yield/:interval/:maturity", async (req, res) => {
    const interval = req.params.interval
    const maturity = req.params.maturity

    const validInterval = ["daily", "weekly", "monthly"]
    if (!validInterval.includes(interval)) {
        return res.status(500).json({ error: "Invalid input, please use annual or quarterly" })
    }

    const validMaturity = ["3month", "2year", "5year", "7year", "10year", "30year"]
    if (!validMaturity.includes(maturity)) {
        return res.status(500).json({ error: "Invalid input, please use annual or quarterly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=${interval}&maturity=${maturity}&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});

router.get("/federal-funds-rate/:interval", async (req, res) => {
    const interval = req.params.interval

    const validInterval = ["daily", "weekly", "monthly"]
    if (!validInterval.includes(interval)) {
        return res.status(500).json({ error: "Invalid input, please use annual or quarterly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval=${interval}&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});

router.get("/cpi/:interval", async (req, res) => {
    const interval = req.params.interval

    const validInterval = ["daily", "weekly", "monthly"];

    if (!validInterval.includes(interval)) {
        return res.status.json({ error: "Invalid input, please use daily, weekly or monthly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=CPI&interval=${interval}&apikey=${apiKey}`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
})

router.get("/inflation", async (req, res) => {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=INFLATION&apikey=${apiKey}`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
})

router.get("/retail-sales", async (req, res) => {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=REATIL_SALES&apikey=${apiKey}`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
})

router.get("/durables", async (req, res) => {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=DURABLES&apikey=${apiKey}`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
})

router.get("/unemployment", async (req, res) => {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=UNEMPLOYMENT&apikey=${apiKey}`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
})

router.get("/non-farm-payroll", async (req, res) => {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=NONFARM_PAYROLL&apikey=${apiKey}`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
})

module.exports = router;