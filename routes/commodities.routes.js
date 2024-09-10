const { json } = require("express");

const router = require("express").Router()
const apiKey = 'UKYI48QGI96XRW9G';

router.get("/price/crude-oil-wti", async (req, res) => {
    const interval = req.params.interval

    const validInterval = ["daily", "weekly", "monthly"]
    if (!validInterval.includes(interval)) {
        return res.status(500).json({ error: "Invalid input, please use daily, weekly or monthly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=WTI&interval=${interval}&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});

router.get("/price/crude-oil-brent", async (req, res) => {
    const interval = req.params.interval

    const validInterval = ["daily", "weekly", "monthly"]
    if (!validInterval.includes(interval)) {
        return res.status(500).json({ error: "Invalid input, please use daily, weekly or monthly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=BRENT&interval=${interval}&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});

router.get("/price/natural-gas", async (req, res) => {
    const interval = req.params.interval

    const validInterval = ["daily", "weekly", "monthly"]
    if (!validInterval.includes(interval)) {
        return res.status(500).json({ error: "Invalid input, please use daily, weekly or monthly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=NATURAL_GAS&interval=${interval}&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});

router.get("/price/copper", async (req, res) => {
    const interval = req.params.interval

    const validInterval = ["daily", "weekly", "monthly"]
    if (!validInterval.includes(interval)) {
        return res.status(500).json({ error: "Invalid input, please use daily, weekly or monthly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=COPPER&interval=${interval}&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});

router.get("/price/aluminium", async (req, res) => {
    const interval = req.params.interval

    const validInterval = ["daily", "weekly", "monthly"]
    if (!validInterval.includes(interval)) {
        return res.status(500).json({ error: "Invalid input, please use daily, weekly or monthly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=ALUMINIUM&interval=${interval}&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});

router.get("/price/wheat", async (req, res) => {
    const interval = req.params.interval

    const validInterval = ["daily", "weekly", "monthly"]
    if (!validInterval.includes(interval)) {
        return res.status(500).json({ error: "Invalid input, please use daily, weekly or monthly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=WHEAT&interval=${interval}&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});

router.get("/price/sugar", async (req, res) => {
    const interval = req.params.interval

    const validInterval = ["daily", "weekly", "monthly"]
    if (!validInterval.includes(interval)) {
        return res.status(500).json({ error: "Invalid input, please use daily, weekly or monthly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=SUGAR&interval=${interval}&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});

router.get("/price/cotton", async (req, res) => {
    const interval = req.params.interval

    const validInterval = ["daily", "weekly", "monthly"]
    if (!validInterval.includes(interval)) {
        return res.status(500).json({ error: "Invalid input, please use daily, weekly or monthly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=COTTON&interval=${interval}&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});

router.get("/price/corn", async (req, res) => {
    const interval = req.params.interval

    const validInterval = ["daily", "weekly", "monthly"]
    if (!validInterval.includes(interval)) {
        return res.status(500).json({ error: "Invalid input, please use daily, weekly or monthly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=CORN&interval=${interval}&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});

router.get("/price/coffee", async (req, res) => {
    const interval = req.params.interval

    const validInterval = ["daily", "weekly", "monthly"]
    if (!validInterval.includes(interval)) {
        return res.status(500).json({ error: "Invalid input, please use daily, weekly or monthly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=COFFEE&interval=${interval}&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});

router.get("/price/all", async (req, res) => {
    const interval = req.params.interval

    const validInterval = ["daily", "weekly", "monthly"]
    if (!validInterval.includes(interval)) {
        return res.status(500).json({ error: "Invalid input, please use daily, weekly or monthly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=ALL_COMMODITIES&interval=${interval}&apikey=${apiKey}`)
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
});

module.exports = router;