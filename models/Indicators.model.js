const { model, Schema } = require('mongoose');

const indicatorsSchema = new Schema({
    functionType: {
        type: String,
        required: true,
    },
    params: {
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

const Indicators = model('Indicators', indicatorsSchema)
module.exports = Indicators;