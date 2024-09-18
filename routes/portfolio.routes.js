const router = require("express").Router();
const Portfolio = require("../models/Portfolio.model")
const { isAthenticated } = require("../middleware/auth.middleware")

router.get("/", isAthenticated, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ user: req.user._id })

        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/investment", isAthenticated, async (req, res) => {
    const { type, symbol, amount, buyPrice } = req.body;
    try {

        let portfolio = await Portfolio.findOne({ user: req.user._id })

        if (!portfolio) {
            portfolio = new Portfolio({ user: req.user._id, investments: [] })
        }

        portfolio.investments.push({ type, symbol, amount, buyPrice })
        await portfolio.save();

        res.status(201).json(portfolio)
    } catch (error) {
        res.status(500).json({ error: "Error añadiendo inversión al portfolio" })
    }
})

router.put("/investment/:investmentId", isAthenticated, async (req, res) => {
    const { investmentId } = req.params;
    const { amount, buyPrice } = req.body;

    try {
        const portfolio = await Portfolio.findOne({ user: req.user._id })

        if (!portfolio) return res.status(404).json({ message: "Portfolio not found" })

        const investment = portfolio.investments.id(investmentId)

        if (!investment) return res.status(404).json({ message: "Investment not found" })

        if (amount !== undefined) investment.amount = amount;
        if (buyPrice !== undefined) investment.buyPrice = buyPrice;

        await portfolio.save()

        res.status(200).json({ message: "Investment updates", portfolio })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete("/investment/:investmentId", isAthenticated, async (req, res) => {
    const { investmentId } = req.params;

    try {
        const portfolio = await Portfolio.findOne({ user: req.user._id })

        if (!portfolio) return res.status(404).json({ message: "Portfolio not found" })

        const investment = portfolio.investments.id(investmentId)

        if (!investment) return res.status(404).json({ message: "Investment not found" })

        investment.remove()
        await portfolio.save()

        res.status(200).json({ message: "Investment updates", portfolio })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router;