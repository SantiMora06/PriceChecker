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

cryptoSchema.index({ symbol: 1, market: 1, timeFrame: 1 }, { unique: true })


const Crypto = model('Crypto', cryptoSchema)
module.exports = Crypto;