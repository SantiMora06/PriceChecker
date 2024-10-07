// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

// 👇 Start handling routes here
const indexRoutes = require('./routes/publicRoutes/index.routes')
app.use('/api', indexRoutes)

const stockRoutes = require('./routes/publicRoutes/stock.routes')
app.use('/stock', stockRoutes)

const cryptoRoutes = require('./routes/publicRoutes/crypto.routes')
app.use('/crypto', cryptoRoutes)

const marketRoutes = require("./routes/publicRoutes/market.routes")
app.use("/market", marketRoutes)

const commoditiesRoutes = require('./routes/publicRoutes/commodities.routes')
app.use('/commodities', commoditiesRoutes)

const portfolioRoutes = require("./routes/privateRoutes/portfolio.routes")
app.use("/portfolio", portfolioRoutes)

const wishlistRoutes = require("./routes/privateRoutes/transactions.routes")
app.use("/wishlist", wishlistRoutes)

const transactionsRoutes = require("./routes/privateRoutes/transactions.routes")
app.use("/transactions", transactionsRoutes)

const authRoutes = require("./routes/privateRoutes/auth.routes")
app.use('/auth', authRoutes)


// ❗ To handle errors. Routes that don't exit or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
