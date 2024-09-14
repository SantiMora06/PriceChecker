const { model, Schema } = require('mongoose');

const cryptoSchema = new Schema({
    symbol: {
        type: String,
        required: true,
        unique: true
    },
    market: {
        type: String,
        required: true
    },
    timeFrame: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Crypto = model('Crypto', cryptoSchema)
module.exports = Crypto;