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

module.exports = router;