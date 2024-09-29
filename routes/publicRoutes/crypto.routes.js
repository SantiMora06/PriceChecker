const router = require("express").Router();
const apiKey = process.env.apiKey;
const Crypto = require("../../models/CryptoData.model");

const testCrypto = ["BTC", "ETH", "ADA", "SOL", "DOT"];
const randomCryptos = testCrypto[Math.floor(Math.random() * testCrypto.length)];

const fetchData = async (timeFrame, symbol, market, apiKey) => {
    const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_${timeFrame.toUpperCase()}&symbol=${symbol}&market=${market}&apikey=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch data from Alpha Vantage");
    return response.json();
};

// Ruta para obtener el tipo de cambio de divisas
router.get('/:from_currency-:to_currency', async (req, res) => {
    const { from_currency, to_currency } = req.params;

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from_currency}&to_currency=${to_currency}&apikey=${apiKey}`);
        if (!response.ok) throw new Error("Failed to fetch currency exchange rate");
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });
    }
});

// Ruta para obtener datos de criptomonedas
router.get('/:timeFrame/:symbol-:market', async (req, res) => {
    const { timeFrame, symbol, market } = req.params;

    const validTimeFrames = ['daily', 'weekly', 'monthly'];
    if (!validTimeFrames.includes(timeFrame)) {
        return res.status(400).json({ error: 'Invalid time frame. Use daily, weekly, or monthly.' });
    }

    try {
        const cachedCrypto = await Crypto.findOne({ symbol, market, timeFrame });

        const oneDay = 24 * 60 * 60 * 1000;
        const now = new Date();

        // Verificar si hay datos en caché
        if (cachedCrypto && now - cachedCrypto.updatedAt < oneDay) {
            return res.json(cachedCrypto.data);
        }

        // Obtener datos de la API externa
        const data = await fetchData(timeFrame, symbol, market, apiKey);

        // Guardar en caché
        await Crypto.findOneAndUpdate(
            { symbol, market, timeFrame },
            { data, updatedAt: new Date() },
            { upsert: true, new: true }
        );

        res.json(data);
    } catch (error) {
        console.error(error); // Para depuración
        res.status(500).json({ error: 'Error fetching data from Alpha Vantage' });
    }
});

// Ruta para obtener criptomonedas aleatorias
router.get('/random-cryptos', async (req, res) => {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${randomCryptos}&to_currency=USD&apikey=${apiKey}`)
        console.log(response)
        const data = response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error:" })
    }
});

module.exports = router;
