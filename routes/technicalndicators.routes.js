const router = require("express").Router()
const apiKey = process.env.apiKey;
const TechnicalIndicators = require("../models/TechnicalIndicators.model")

// Creamos unos arrays con todos los seriesType, Interval y TechnicalIndicators;

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
// Añadimos unas funciones para ayudar a la validación;
const isValidInterval = (interval) => validInterval.includes(interval)
const isValidSeriesType = (seriesType) => validSeriesType.includes(seriesType)
const isValidFunctionType = (functionType) => validTechnicalIndicators.hasOwnProperty(functionType)
const isValidTimePeriod = (timePeriod) => !isNaN(timePeriod) && Number.isInteger(Number(timePeriod)) && timePeriod > 0;

router.get(("/:functionType/:symbol/:interval/:timePeriod/:seriesType"), async (req, res) => {

    const { functionType, symbol, interval, timePeriod, seriesType } = req.params;

    // Validamos el interval
    if (!isValidInterval(interval)) {
        res.status(400).json({ error: "Input not valid, use 1min, 5min, 15min, 30min, 60min, daily, weekly, monthly" })
    }

    // Validamos el seriesType
    if (!isValidSeriesType(seriesType)) {
        res.status(400).json({ error: "Input not valid, use close, open, high, low" })
    }
    // Validamos la functionType
    const technicalIndicatorsFunction = validTechnicalIndicators[functionType];
    if (!technicalIndicatorsFunction) {
        return res.status(400).json({ error: "Invalid function type" })
    }
    // Validamos el timePeriod
    if (!isValidTimePeriod(timePeriod)) {
        return res.status(400).json({ error: "Invalid input, must be positive an integer" })
    }

    try { // Pedimos los datos a la API de Alpha Advantage

        const cacheData = await TechnicalIndicators.findOne({
            functionType: technicalIndicatorsFunction,
            symbol, interval, timePeriod, seriesType
        });

        const oneDay = 24 * 60 * 60 * 1000;
        const now = new Date();

        if (cacheData && now - cacheData.updatedAt < oneDay) {
            return res.json(cacheData.data)
        }

        const response = await fetch(`https://www.alphavantage.co/query?function=${technicalIndicatorsFunction}&symbol=${symbol}&interval=${interval}&time_period=${timePeriod}&series_type=${seriesType}&apikey=${apiKey}`)
        const data = await response.json()
        // Comprobamos si el envío fue correcto
        if (data["Error Message"]) {
            return res.status(500).json({ error: data["Error Message"] })
        }

        await TechnicalIndicators.findOneAndUpdate(
            { functionType },
            { data, updatedAt: new Date() },
            { upsert: true, new: true }
        )
        res.json(data)
    } catch (error) {
        // Comprobamos errores generales
        res.status(500).json({ error: "Error fetching data from Alpha Vantage" })
    }
})

module.exports = router;