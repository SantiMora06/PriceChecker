const router = require("express").Router()
const apiKey = process.env.apiKey;

const validSeriesType = ["close", "open", "high", "low"];
const validInterval = ["1min", "5min", "15min", "30min", "60min", "daily", "weekly", "monthly"]
const validTechnicalIndicators = {
    "sma": "SMA", "ema": "EMA", "wma": "WMA", "dema": "DEMA", "tema": "TEMA", "trima": "TRIMA", "kama": "KAMA",
    "mama": "MAMA", "t3": "T3", "macdext": "MACDEXT", "stochf": "STOCKHF", "stochrsi": "STOCHRSI", "willr": "WILLR",
    "adx": "ADX", "adxr": "ADXR", "apo": "APO", "ppo": "PPO", "mom": "MOM", "bop": "BOP", "cci": "CCI", "cmo": "CMO",
    "roc": "ROC", "rocr": "ROCR", "aroon": "AROON", "aroonosc": "AROONOSC", "mfi": "MFI", "trix": "TRIX",
    "ultosc": "ULTOSC", "dx": "DX", "minus-di": "MINUS_DM", "plus-di": "PLUS_DM", "bbands": "BBANDS",
    "midpoint": "MIDPOINT", "midprice": "MIDPRICE", "sar": "SAR", "trange": "TRANGE", "atr": "ATR", "natr": "NATR",
    "ad": "AD", "adosc": "ADOSC", "obv": "OBV", "ht-trendline": "HT_TRENDLINE", "ht-sine": "HT_SINE",
    "ht-trendmode": "HT_TRENDMODE", "ht-dcperiod": "HT_CDPERIOD", "ht-dcphase": "HT_DCPHASE", "ht-phasor": "HT_PHASOR"
}
// We add in here helper functions for validation
const isValidInterval = (interval) => validInterval.includes(interval)
const isValidSeriesType = (seriesType) => validSeriesType.includes(seriesType)
const isValidFunctionType = (functionType) => validTechnicalIndicators.hasOwnProperty(functionType)
const isValidTimePeriod = (timePeriod) => !isNaN(timePeriod) && Number.isInteger(Number(timePeriod)) && timePeriod > 0;

router.get(("/:functionType/:symbol/:interval/:timePeriod/:seriesType"), async (req, res) => {

    const { functionType, symbol, interval, timePeriod, seriesType } = req.params;

    // Validate the interval
    if (!isValidInterval(interval)) {
        res.status(400).json({ error: "Input not valid, use 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly" })
    }

    // Validate the seriesType
    if (!isValidSeriesType(seriesType)) {
        res.status(400).json({ error: "Input not valid, use close, open, high, low" })
    }
    // Validate the functionType
    const technicalIndicatorsFunction = validTechnicalIndicators[functionType];
    if (!technicalIndicatorsFunction) {
        return res.status(400).json({ error: "Invalid function type" })
    }

    if (!isValidTimePeriod(timePeriod)) {
        return res.status(400).json({ error: "Invalid input, must be positive an integer" })
    }

    try { // Fetch the data from the Alpha Advantage API
        const response = await fetch(`https://www.alphavantage.co/query?function=${technicalIndicatorsFunction}&symbol=${symbol}&interval=${interval}&time_period=${timePeriod}&series_type=${seriesType}&apikey=${apiKey}`)
        const data = await response.json()
        // Check if the data has been sent correctly
        if (data["Error Message"]) {
            return res.status(500).json({ error: data["Error Message"] })
        }
        res.json(data)
    } catch (error) {
        // Catch general errors
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
})

module.exports = router;