const router = require("express").Router();
const { isAthenticated } = require("../../middleware/auth.middleware")
const isAdmin = require("../../middleware/admin.middleware");
const httpMethod = require("../../utils/portfolio.utils")

// Get all portfolios, adminOnly

router.get("/all", isAthenticated, isAdmin, httpMethod.getAllPortfolios)

router.get("/", isAthenticated, httpMethod.getUserPortfolio)

router.post("/investment", isAthenticated, httpMethod.addInvestment)

router.put("/investment/:investmentId", isAthenticated, httpMethod.updateInvestment)

router.delete("/investment/:investmentId", isAthenticated, httpMethod.deleteInvestment)

module.exports = router;