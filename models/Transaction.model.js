const { Schema, model } = require('mongoose')

const TransactionSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    portfolioId: {
        type: Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    transactionType: {
        type: String,
        enum: ['buy', 'sell'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Transaction = model('Transaction', TransactionSchema)

module.exports = Transaction;
