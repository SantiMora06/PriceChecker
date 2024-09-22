const Portfolio = require("../models/Portfolio.model");

// Obtener todos los portfolios (solo para admin)
exports.getAllPortfolios = async (req, res, next) => {
    try {
        const portfolios = await Portfolio.find();
        if (!portfolios.length) return res.status(404).json({ error: "No portfolios found" });
        res.status(200).json(portfolios);
    } catch (error) {
        next(error);
    }
};

// Obtener el portfolio del usuario autenticado
exports.getUserPortfolio = async (req, res, next) => {
    try {
        const portfolio = await Portfolio.findOne({ user: req.user._id });
        if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });
        res.status(200).json(portfolio);
    } catch (error) {
        next(error);
    }
};

// Agregar una nueva inversión al portfolio
exports.addInvestment = async (req, res, next) => {
    const { type, symbol, amount, buyPrice } = req.body;
    if (!type || !symbol || !amount || !buyPrice) {
        return res.status(400).json({ error: "All fields (type, symbol, amount, buyPrice) are required." });
    }

    try {
        let portfolio = await Portfolio.findOne({ user: req.user._id });
        if (!portfolio) {
            portfolio = new Portfolio({ user: req.user._id, investments: [] });
        }

        // Evitar duplicar inversiones con el mismo símbolo
        const investmentExists = portfolio.investments.some(inv => inv.symbol === symbol);
        if (investmentExists) {
            return res.status(400).json({ error: "Investment with this symbol already exists in the portfolio." });
        }

        portfolio.investments.push({ type, symbol, amount, buyPrice });
        await portfolio.save();
        res.status(201).json(portfolio);
    } catch (error) {
        next(error);
    }
};

// Actualizar una inversión existente
exports.updateInvestment = async (req, res, next) => {
    const { investmentId } = req.params;
    const { amount, buyPrice } = req.body;

    try {
        const portfolio = await Portfolio.findOne({ user: req.user._id });
        if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });

        const investment = portfolio.investments.id(investmentId);
        if (!investment) return res.status(404).json({ error: "Investment not found" });

        if (amount !== undefined) investment.amount = amount;
        if (buyPrice !== undefined) investment.buyPrice = buyPrice;

        await portfolio.save();
        res.status(200).json({ message: "Investment updated successfully", portfolio });
    } catch (error) {
        next(error);
    }
};

// Eliminar una inversión
exports.deleteInvestment = async (req, res, next) => {
    const { investmentId } = req.params;

    try {
        const portfolio = await Portfolio.findOne({ user: req.user._id });
        if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });

        const investment = portfolio.investments.id(investmentId);
        if (!investment) return res.status(404).json({ error: "Investment not found" });

        investment.remove();
        await portfolio.save();
        res.status(200).json({ message: "Investment removed successfully", portfolio });
    } catch (error) {
        next(error);
    }
};
