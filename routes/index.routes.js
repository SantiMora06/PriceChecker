const router = require('express').Router()

router.get('/', (req, res) => {
  res.json('All good in here')
})

const stockRoutes = require('./routes/stock.routes')
app.use('/stock', stockRoutes)

const cryptoRoutes = require('./routes/crypto.routes')
app.use('/crypto', cryptoRoutes)

const indicatorsRoutes = require('./routes/indicators.routes')
app.use('/indicators', indicatorsRoutes)

const commoditiesRoutes = require('./routes/commodities.routes')
app.use('/commodities', commoditiesRoutes)

const technicalIndicatorsRoutes = require('./routes/technicalndicators.routes')
app.use('/technical-indicators', technicalIndicatorsRoutes)

const portfolioRoutes = require("./routes/portfolio.routes")
app.use("/portfolio", portfolioRoutes)

const wishlistRoutes = require("./routes/wishlist.routes")
app.use("/wishlist", wishlistRoutes)

const transactionsRoutes = require("./routes/transactions.routes")
app.use("/transactions", transactionsRoutes)

module.exports = router
