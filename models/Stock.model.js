const { model, Schema } = require('mongoose');

const stockSchema = new Schema({
    symbol: {
        type: String,
        required: true
    },
    functionType: {
        type: String,
        require: true
    },
    data: {
        type: Object,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

stockSchema.index({ symbol: 1, functionType: 1 }, { unique: true })

const Stock = model('Stock', stockSchema)
module.exports = Stock;