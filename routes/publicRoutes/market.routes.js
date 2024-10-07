const router = require("express").Router()
const apiKey = process.env.apiKey

const fetchMarketGainers = async () => {
    const data = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${apiKey}`);
    if (!data.ok) {
        throw new Error(`API error: ${data.statusText}`);
    }
    const response = await data.json();

    const symbols = response.map((gainer) => gainer.symbol).slice(0, 5);
    return symbols;
};

const fetchMarketLosers = async () => {
    const data = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${apiKey}`);
    if (!data.ok) {
        throw new Error(`API error: ${data.statusText}`);
    }
    const response = await data.json();

    const symbols = response.map((loser) => loser.symbol).slice(0, 5);
    return symbols;
};

router.get("/gainers", async (req, res) => {
    try {
        // Fetch the top 5 market gainers symbols
        const symbols = await fetchMarketGainers();

        // Fetch detailed data for each gainer
        const requests = symbols.map((symbol) =>
            fetch(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`)
        );
        const responses = await Promise.all(requests);

        // Convert each response to JSON and verify response status
        const quotesData = await Promise.all(
            responses.map(async (response) => {
                if (!response.ok) {
                    throw new Error(`API error for symbol: ${response.statusText}`);
                }
                return response.json();
            })
        );

        // Flatten and structure the data properly
        const combineData = quotesData.flat().map((quote) => ({
            name: quote.name,
            symbol: quote.symbol,
            price: quote.price,
            exchangeRate: quote.changesPercentage,
        }));

        res.json({ quotes: combineData });
    } catch (error) {
        console.error("Error fetching gainers:", error.message);
        res.status(500).json({ Error: "Failed to fetch market gainers" });
    }
});

router.get("/losers", async (req, res) => {
    try {
        // Fetch the top 5 market losers symbols
        const symbols = await fetchMarketLosers();

        // Fetch detailed data for each loser
        const requests = symbols.map((symbol) =>
            fetch(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`)
        );
        const responses = await Promise.all(requests);

        // Convert each response to JSON and verify response status
        const quotesData = await Promise.all(
            responses.map(async (response) => {
                if (!response.ok) {
                    throw new Error(`API error for symbol: ${response.statusText}`);
                }
                return response.json();
            })
        );

        // Flatten and structure the data properly
        const combineData = quotesData.flat().map((quote) => ({
            name: quote.name,
            symbol: quote.symbol,
            price: quote.price,
            exchangeRate: quote.changesPercentage,
        }));

        res.json({ quotes: combineData });
    } catch (error) {
        console.error("Error fetching losers:", error.message);
        res.status(500).json({ Error: "Failed to fetch market losers" });
    }
});

module.exports = router;
