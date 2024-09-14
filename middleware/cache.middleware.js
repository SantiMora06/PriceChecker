const apiKey = process.env.apiKey;

// Centralized cache middleware
const cacheMiddleware = (model, functionType, getParams) => async (req, res, next) => {
    const params = getParams(req);
    const { symbol, interval, maturity, from_symbol, to_symbol } = params || ''; // Modify as needed

    try {
        //  Creamos una llave basada en los parámetros creados

        const cacheQuery = { functionType, symbol, interval, maturity, from_symbol, to_symbol };

        const cachedData = await model.findOne({ cacheQuery });

        const oneDay = 24 * 60 * 60 * 1000;
        const now = new Date();

        if (cachedData && now - cachedData.updatedAt < oneDay) {
            // Send cached data if it's still valid
            return res.json(cachedData.data);
        }

        // Add the apiKey to the params and attach it to the request for later use
        req.apiParams = { ...params, apikey: apiKey };

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = cacheMiddleware;