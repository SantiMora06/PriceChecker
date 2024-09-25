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
    "coffee": "COFFEE"
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

router.get("/random-commodities", async (req, res) => {
    try {
        const commodityKeys = Object.keys(validCommodities);
        const selectedCommodities = new Set(); // Use a Set to ensure uniqueness

        // Randomly select 5 unique commodities
        while (selectedCommodities.size < 5) {
            const randomCommodity = commodityKeys[Math.floor(Math.random() * commodityKeys.length)];
            selectedCommodities.add(randomCommodity); // Set will ensure no duplicates
        }

        const interval = "daily"; // You can make this random if needed
        const results = [];

        for (const randomCommodity of selectedCommodities) {
            const commodityFunction = validCommodities[randomCommodity];

            // Check for cached data
            const cachedData = await Commodities.findOne({ commodity: randomCommodity, interval });
            const oneDay = 24 * 60 * 60 * 1000;
            const now = new Date();

            if (cachedData && now - cachedData.updatedAt < oneDay) {
                results.push({ commodity: randomCommodity, data: cachedData.data });
                continue; // Skip the fetch if cached data is available
            }

            // Fetch data from the external API
            const response = await fetch(`https://www.alphavantage.co/query?function=${commodityFunction}&interval=${interval}&apikey=${apiKey}`);
            const data = await response.json();

            // Cache the fetched data
            await Commodities.findOneAndUpdate(
                { commodity: randomCommodity, interval },
                { data, updatedAt: new Date() },
                { upsert: true, new: true }
            );

            results.push({ commodity: randomCommodity, data }); // Add the new data to results
        }

        res.json(results); // Return the array of commodities
    } catch (error) {
        console.error("Error fetching random commodities:", error); // Log the error for debugging
        res.status(500).json({ error: "Error fetching random commodities data." });
    }
});


module.exports = router;