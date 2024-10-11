const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const InvestmentsSchema = new Schema(
    {
        type: {
            type: String,
            enum: ["crypto", "commodity"],
        },
        symbol: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        buyPrice: {
            type: Number,
            required: true
        },
        buyDate: {
            type: Date,
            default: Date.now
        },
        dateCreated: { type: Date, default: Date.now },
    })

const PortfolioSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    investments: [InvestmentsSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

PortfolioSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});


const Portfolio = model('Portfolio', PortfolioSchema)

module.exports = Portfolio;
