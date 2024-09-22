const router = require('express').Router()

router.get('/', (req, res) => {
  res.json('All good in here')
})

const stockRoutes = require('./stock.routes')
router.use('/stock', stockRoutes)

const cryptoRoutes = require('./crypto.routes')
router.use('/crypto', cryptoRoutes)

const indicatorsRoutes = require('./indicators.routes')
router.use('/indicators', indicatorsRoutes)

const commoditiesRoutes = require('./commodities.routes')
router.use('/commodities', commoditiesRoutes)

const technicalIndicatorsRoutes = require('./technicalndicators.routes')
router.use('/technical-indicators', technicalIndicatorsRoutes)

const portfolioRoutes = require("../privateRoutes/portfolio.routes")
router.use("/portfolio", portfolioRoutes)

const wishlistRoutes = require("../privateRoutes/wishlist.routes")
router.use("/wishlist", wishlistRoutes)

const transactionsRoutes = require("../privateRoutes/transactions.routes")
router.use("/transactions", transactionsRoutes)

module.exports = router
