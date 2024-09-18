const isAdmin = require("../middleware/admin.middleware");
const { isAthenticated } = require("../middleware/auth.middleware");
const Portfolio = require("../models/Portfolio.model");
const Transaction = require("../models/Transaction.model")
const router = require("express").Router();

router.get("/", isAthenticated, isAdmin, async (req, res) => {
    try {

        const transactions = await Transaction.find()

        if (!transactions || transactions.length === 0) return res.status(404).json({ error: "No hay transacciones" })

        // Agrupamos transacciones por usuarios;

        const transactionsByUser = transactions.reduce((element, transaction) => {
            if (!element[transaction.userId]) element[transaction.userId] = []
            element[transaction.userId].push(transaction)
            return element
        }, {})

        res.status(200).json({
            allTransactions: transactions, transactionsByUser
        });

    } catch (error) {
        next(error)
    }
})

router.get("/user/:userId", isAthenticated, async (req, res) => {
    const { userId } = req.params;

    try {
        const transactions = await Transaction.find({ userId });
        if (!transactions || transactions.length === 0) return res.status(404).json({ error: "Transacciones no encontradas para este usuario" })
        res.status(200).json(transactions)
    } catch (error) {
        res.status(500).json({ error: `No se han podido obtener transacciones para el usuario ${userId}` })
    }
})

router.post("/:transactionId/process", isAthenticated, async (req, res) => {
    const { transactionId } = req.params;

    try {

        const transaction = await Transaction.findById(transactionId);

        if (!transaction) return res.status(404).json({ error: "Transacción no encontrada" })

        if (transaction.status !== "pending") return res.status(400).json({ error: "La transacción ya ha sido procesada" })

        transaction.status = "completed"
        transaction.completedAt = new Date();
        await transaction.save()

        const { userId, symbol, amount, type } = transaction;
        const userPortfolio = await Portfolio.findOne({ userId });

        if (!userPortfolio) return res.status(404).json({ error: "El portfolio del usuario no ha sido encontrado" })

        const investmentIndex = userPortfolio.investments.findIndex(investment => investment.symbol === symbol)

        if (type === "buy") {
            if (investmentIndex === -1) {
                userPortfolio.investments.push({ symbol, quantity })
            } else {
                userPortfolio.investments[investmentIndex].quantity += quantity;
            }
        } else if (type === "sell") {
            if (investmentIndex === -1 || userPortfolio.investments[investmentIndex].quantity < quantity) {
                return res.status(400).status({ error: "No tienes suficientes unidades para vender" })
            } else {
                userPortfolio.investments[investmentIndex].quantity -= quantity;
                if (userPortfolio.investments[investmentIndex].quantity === 0) userPortfolio.investments.splice(investmentIndex, 1);
            }
        } else {
            return res.status(400).json({ error: "Tipe de transacción inválido" })
        }

        await userPortfolio.save();
        res.status(200).json({ error: "Transacción completada y portfolio actualizado" })
    } catch (error) {
        res.status(500).json({ error: `Error al procesar la transacción ${transactionId}` })
        await Transaction.findByIdAndUpdate(transactionId, { status: "failed" });
    }
})


router.put("/:transactionId", isAthenticated, async (req, res) => {
    const { transactionId } = req.params;
    const { status, symbol, amount, type } = req.body;

    try {
        const transaction = await Transaction.findById(transactionId)

        if (transaction) return res.status(404).json({ error: "Transacción no encontrada" })

        if (status) {
            transaction.status = status;
            if (status === "completed") {
                transaction.completedAt = new Date();

                const userPortfolio = await Portfolio.findOne({ userId: transaction.userId })
                if (userPortfolio) {
                    const investmentIndex = userPortfolio.investments.findIndex(investment => investment.symbol === symbol)
                    if (type === "buy") {
                        if (investmentIndex === -1) {
                            userPortfolio.investments.push({ symbol, quantity })
                        } else {
                            userPortfolio.investments[investmentIndex].quantity += quantity;
                        }
                    } else if (type === "sell") {
                        if (investmentIndex === -1 || userPortfolio.investments[investmentIndex].quantity < quantity) {
                            return res.status(400).status({ error: "No tienes suficientes unidades para vender" })
                        } else {
                            userPortfolio.investments[investmentIndex].quantity -= quantity;
                            if (userPortfolio.investments[investmentIndex].quantity === 0) userPortfolio.investments.splice(investmentIndex, 1);
                        }
                    } else {
                        return res.status(400).json({ error: "Tipe de transacción inválido" })
                    }
                    await userPortfolio.save()
                }
            }

        }

        if (symbol) transaction.symbol = symbol
        if (amount) transaction.amount = amount
        if (type) transaction.type = type

        await transaction.save()
        res.status(200).json({ message: "Transacción exitosa" })
    } catch (error) {
        res.status(500).json({ error: `Ha habido un problema actualizando su transacción: ${transactionId}` })
    }
})

module.exports = router;