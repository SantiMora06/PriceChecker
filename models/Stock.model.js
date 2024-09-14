const { model, Schema } = require('mongoose');

const stockSchema = new Schema({
    symbol: {
        type: String,
        required: true,
        unique: true
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

const Stock = model('Stock', stockSchema)
module.exports = Stock;