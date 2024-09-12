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
const indexRoutes = require('./routes/index.routes')
app.use('/api', indexRoutes)

const stockRoutes = require('./routes/stock.routes')
app.use('/stock', stockRoutes)

const cryptoRoutes = require('./routes/crypto.routes')
app.use('/crypto', cryptoRoutes)

const indicatorsRoutes = require('./routes/indicators.routes')
app.use('/indicators', indicatorsRoutes)

const commoditiesRoutes = require('./routes/commodities.routes')
app.use('/commodities', commoditiesRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
