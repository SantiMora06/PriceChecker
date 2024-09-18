const { Schema, model } = require('mongoose')

const TransactionSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', "failed"],
        required: true,
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date,
    }
});

const Transaction = model('Transaction', TransactionSchema)

module.exports = Transaction;
