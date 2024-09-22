const Transaction = require("../models/Transaction.model");
const Portfolio = require("../models/Portfolio.model");

const transactionLogic = {
    async createTransaction(userId, transactionData) {
        const transaction = new Transaction({ userId, ...transactionData });
        await transaction.save();
        return transaction;
    },

    async getAllTransactions() {
        return await Transaction.find();
    },

    async getUserTransactions(userId) {
        return await Transaction.find({ userId });
    },

    async processTransaction(transactionId) {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) throw new Error("Transaction not found");

        if (transaction.status !== "pending") {
            throw new Error("Transaction already processed");
        }

        transaction.status = "completed";
        transaction.completedAt = new Date();
        await transaction.save();

        const userPortfolio = await Portfolio.findOne({ userId: transaction.userId });
        if (!userPortfolio) throw new Error("User portfolio not found");

        const investmentIndex = userPortfolio.investments.findIndex(investment => investment.symbol === transaction.symbol);
        if (transaction.type === "buy") {
            if (investmentIndex === -1) {
                userPortfolio.investments.push({ symbol: transaction.symbol, quantity: transaction.amount });
            } else {
                userPortfolio.investments[investmentIndex].quantity += transaction.amount;
            }
        } else if (transaction.type === "sell") {
            if (investmentIndex === -1 || userPortfolio.investments[investmentIndex].quantity < transaction.amount) {
                throw new Error("Insufficient units to sell");
            } else {
                userPortfolio.investments[investmentIndex].quantity -= transaction.amount;
                if (userPortfolio.investments[investmentIndex].quantity === 0) {
                    userPortfolio.investments.splice(investmentIndex, 1);
                }
            }
        } else {
            throw new Error("Invalid transaction type");
        }

        await userPortfolio.save();
        return transaction;
    },

    async updateTransaction(transactionId, updateData) {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) throw new Error("Transaction not found");

        Object.assign(transaction, updateData);
        await transaction.save();
        return transaction;
    },

    async deleteTransaction(transactionId) {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) throw new Error("Transaction not found");

        await transaction.remove();
        return transaction;
    }
};

module.exports = transactionLogic;
