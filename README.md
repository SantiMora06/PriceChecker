# Financial Market Data Fetcher

A comprehensive Node.js application integrated with MongoDB Atlas, designed to fetch and cache real-time financial data from the Alpha Vantage API. This app provides access to stock prices, technical indicators, GDP data, commodities, and more, with optimized performance through caching.

## Table of Contents
1. [Technologies](#technologies)
2. [Features](#features)
3. [Installation & Setup](#installation--setup)
4. [API Usage](#api-usage)
5. [Example API Calls](#example-api-calls)
6. [Contributing](#contributing)

## Technologies
- **Node.js**
- **Express.js**
- **MongoDB (MongoDB Atlas)**
- **Alpha Vantage API**
- **Mongoose**
- **Morgan**
- **Cors**
- **Cookie-Parser**

## Features
- **Fetch Real-Time Data**: Retrieve live financial data, including stocks, technical indicators, and commodities.
- **Caching**: Automatically caches data to avoid redundant API requests and improves performance.
- **MongoDB Integration**: Persistent data storage through MongoDB Atlas.
- **Input Validation**: Ensures secure and reliable API usage with proper validation for all inputs.

## Installation & Setup
1. Clone the repository:

  -  git clone https://github.com/SantiMora06/PriceChecker.git

2. Navigate to the project folder:

- cd PriceChecker

3. Install dependencies:

- npm i express nodemon dotenv mongoose morgan cors cookie-parser bcryptjs jasonwebtoken

4. Set up environment variables:

- Create a .env file and add:

- apiKey=your-alpha-vantage-api-key
- MONGODB_URI=your-mongodb-uri

5. Run the application:

- npm start dev


6. For automatic server updates on file changes:

- npm run dev

7. Access the app:

http://localhost:3000

## API Usage

**Available Routes:** "Add the remaining routes"

- /api: Base route for the API.
- /stock: Retrieve stock data.
- /indicators: Fetch economic indicators.
- /technicalindicators: Retrieve technical indicators.
- /commodities: Fetch commodity prices.
- /crypto: Retrieve cryptocurrency data.

## Example API Calls

**Example Routes:**

**Stock Price:** Fetches stock prices based on the symbol and interval.

- GET /stock/price/{symbol}/{interval}

**Example:**

- GET http://localhost:3000/stock/price/MSFT/daily

**Technical Indicators:** Retrieves technical indicators based on symbol, interval, and series type.

- GET /technicalindicators/{indicator}/{symbol}/{interval}/{timePeriod}/{seriesType}

**Example:**

- GET http://localhost:3000/technicalindicators/sma/AAPL/daily/20/close

**Commodities Prices:** Fetches commodity prices based on the commodity and interval.

GET /commodities/price/{commodity}/{interval}

**Example:**

GET http://localhost:3000/commodities/price/crude-oil-wti/daily

**Cryptocurrency Prices:** Retrieves cryptocurrency data based on symbol and market.

GET /crypto/price/{symbol}/{market}
**Example:**

GET http://localhost:3000/crypto/price/BTC/USD

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

- Fork the project.
> Create your feature branch:

- git checkout -b feature/AmazingFeature
> Commit your changes:

- git commit -m 'Add some AmazingFeature'
> Push to the branch:

- git push origin feature/AmazingFeature
> Open a pull request.

**Have fun and happy coding!**
