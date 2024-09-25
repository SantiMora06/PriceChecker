const router = require("express").Router()
const apiKey = process.env.apiKey;
const Commodities = require("../../models/CommoditiesData.model")

// Creamos dos arrays, uno para los intervalos de tiempo y otro para los commodities. En commodities creamos varios objetos con propiedades que se añadiran a la url
// Y el functionType correspondiente.

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

// Creamos una ruta dinámica para las commodities
router.get("/price/:commodity/:interval", async (req, res) => {
    // Necesitamos los parámetros de commodity y de interval que serán añadidos a la url.
    const { commodity, interval } = req.params;

    // Necesitamos verificar que el interval incluye los validInterval.
    if (!validInterval.includes(interval)) {
        return res.status(400).json({ error: "Invalid interval. Please use daily, weekly, or monthly." });
    }

    // Necesitamos verificar que el commodity incluye los validCommodities.
    const commodityFunction = validCommodities[commodity];
    if (!commodityFunction) {
        return res.status(400).json({ error: "Invalid commodity. Please provide a valid commodity type." });
    }

    try {

        const cachedData = await Commodities.findOne({ commodity, interval })
        const oneDay = 24 * 60 * 60 * 1000;
        const now = new Date();

        if (cachedData && now - cachedData.updatedAt < oneDay) {
            return res.json(cachedData.data)
        }

        // Aquí hacemos la petición de fetch con parámetros dinámicos como commodityFunction, interval y apiKey
        const response = await fetch(`https://www.alphavantage.co/query?function=${commodityFunction}&interval=${interval}&apikey=${apiKey}`);
        const data = await response.json();
        await Commodities.findOneAndUpdate(
            { commodity, interval },
            { data, updatedAt: new Date() },
            { upsert: true, new: true })
        // Enviamos los datos 
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from Alpha Vantage." });
    }
});

router.get("/search", async (req, res) => {
    const { query } = req.query;

    if (!query) return res.status(400).json({ error: "Query parameter is required" })

    const matchingCommodities = Object.keys(validCommodities).filter(commodityKey =>
        commodityKey.includes(query.toLowerCase())
    );

    if (matchingCommodities.length === 0) {
        return res.status(404).json({ error: "No matching commodities found." });
    }

    // Devuelve los commodities coincidentes
    res.json(matchingCommodities);
})

router.get("/random-commodity", async (req, res) => {
    try {
        // Elegimos una commodity y un intervalo aleatorios
        const commodityKeys = Object.keys(validCommodities);
        const randomCommodity = commodityKeys[Math.floor(Math.random() * commodityKeys.length)];
        const interval = "daily"; // Puedes hacer esto aleatorio si lo prefieres

        const commodityFunction = validCommodities[randomCommodity];

        // Verificamos si hay datos en caché
        const cachedData = await Commodities.findOne({ commodity: randomCommodity, interval });
        const oneDay = 24 * 60 * 60 * 1000;
        const now = new Date();

        if (cachedData && now - cachedData.updatedAt < oneDay) {
            return res.json({ commodity: randomCommodity, data: cachedData.data });
        }

        // Hacemos la petición a la API externa
        const response = await fetch(`https://www.alphavantage.co/query?function=${commodityFunction}&interval=${interval}&apikey=${apiKey}`);
        const data = await response.json();

        // Guardamos en caché y enviamos la respuesta
        await Commodities.findOneAndUpdate(
            { commodity: randomCommodity, interval },
            { data, updatedAt: new Date() },
            { upsert: true, new: true }
        );

        res.json({ commodity: randomCommodity, data });
    } catch (error) {
        res.status(500).json({ error: "Error fetching random commodity data." });
    }
});

module.exports = router;