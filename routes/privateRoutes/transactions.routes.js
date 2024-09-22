const isAdmin = require("../../middleware/admin.middleware");
const { isAthenticated } = require("../../middleware/auth.middleware");
const transactionLogic = require("../../utils/transactionLogic.utils")
const router = require("express").Router();


// Obtener todas las transacciones y agruparlas por usuario

router.get("/", isAthenticated, async (req, res, next) => {
    try {
        const transactions = await transactionLogic.getAllTransactions();
        if (!transactions || transactions.length === 0)
            res.status(200).json(transactions);
    } catch (error) {
        next(error)
    }
});

// Obtener transacciones de un usuario específico
router.get("/user/:userId", isAthenticated, async (req, res, next) => {
    const { userId } = req.params;
    try {
        const transactions = await transactionLogic.getUserTransactions(userId);
        if (!transactions || transactions.length === 0) return res.status(400).json({ error: `There are not transactions for ${userId}` })
        res.status(200).json(transactions);
    } catch (error) {
        next(error)
    }
});

router.get("/all", isAthenticated, isAdmin, async (req, res, next) => {
    try {
        const transactions = await transactionLogic.getAllTransactions();
        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ error: "No hay transacciones registradas." });
        }
        res.status(200).json(transactions);
    } catch (error) {
        next(error)
    }
});
// Procesar una transacción (comprar/vender)
router.post("/:transactionId/process", isAthenticated, async (req, res, next) => {
    const { transactionId } = req.params;
    try {
        const transaction = await transactionLogic.processTransaction(transactionId);

        res.status(200).json(transaction);
    } catch (error) {
        next(error)
    }
});

// Actualizar transacción existente
router.put("/:transactionId", isAthenticated, async (req, res, next) => {
    const { transactionId } = req.params;

    try {
        const transaction = await transactionLogic.updateTransaction(transactionId, req.body);
        if (!transaction) return res.status(404).json({ error: `Transaction not found for user ${userId}` })
        res.status(200).json(transaction);
    } catch (error) {
        next(error)
    }
});

router.delete("/:transactionId", isAthenticated, async (req, res, next) => {
    const { transactionId } = req.params;

    try {
        const transaction = await transactionLogic.deleteTransaction(transactionId)
        if (!transaction) return res.status(404).json({ error: `Transaction not found for user ${transactionId}` });

        res.status(200).json({ message: "Transaction deleted successfully" })
    } catch (error) {
        next(error)
    }
})

module.exports = router;
