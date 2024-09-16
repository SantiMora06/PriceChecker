const { model, Schema } = require('mongoose');

const technicalIndicatorsSchema = new Schema({
    functionType: {
        type: String,
        required: true,
    },
    symbol: {
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

const technicalIndicators = model('technicalIndicators', technicalIndicatorsSchema)
module.exports = technicalIndicators;