const apiKey = process.env.apiKey;

// Function to centralize fetching data from Alpha Vantage
const fetchFromAlphaVantage = async (functionType, params = '') => {
    try {
        const urlParams = new URLSearchParams({ apikey: apiKey, ...params });
        const url = `https://www.alphavantage.co/query?function=${functionType}&${params}&apikey=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching data from Alpha Vantage: ${error.message}`);
    }
};

module.exports = { fetchFromAlphaVantage };