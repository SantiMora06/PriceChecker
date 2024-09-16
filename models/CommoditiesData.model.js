const { model, Schema } = require('mongoose');

const commoditiesSchema = new Schema({
    functionType: {
        type: String,
        required: true,
    },
    commodity: {
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

const commodities = model('commodities', commoditiesSchema)
module.exports = commodities;