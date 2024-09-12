const router = require("express").Router()
const apiKey = 'UKYI48QGI96XRW9G';

router.get(("/:symbol/:interval/:seriestype"), async (req, res) => {
    const interval = req.params.interval;
    const symbol = req.params.symbol;
    const seriesType = req.params.seriestype;
    const timePeriod = req.params.timePeriod;

    const validInterval = ["1min", "5min", "15min", "30min", "60min", "daily", "weekly", "monthly"]
    if (!validInterval.includes(interval)) {
        res.status(500).json({ error: "Input not valid" })
    }
    const validSeriesType = ["close", "open", "high", "low"]
    if (!validSeriesType.includes(seriesType)) {
        res.status(500).json({ error: "Input not valid, use close, open, high, low" })
    }

    if (isNaN(timePeriod) || timePeriod <= 0) {
        return res.status(500).json({ error: "Invalid time period, use 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly" })
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=${interval}&series_type=${seriesType}&apikey=${apiKey}`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
})

module.exports = router;