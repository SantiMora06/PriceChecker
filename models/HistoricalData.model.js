const { model, Schema } = require('mongoose');

const HistoricalDataSchema = new Schema({
    symbol: {
        type: String,
        required: true,
        unique: true
    },
    data: {
        type: Object,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const HistoricalData = model('HistoricalData', HistoricalDataSchema)
module.exports = HistoricalData;