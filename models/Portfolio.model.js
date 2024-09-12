const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const PortfolioSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        investments: [
            {
                symbol: {
                    type: String,
                    required: true
                },
                type: {
                    type: String,
                    enum: ['stock', 'crypto', 'commodity'],
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
                }
            }
        ],
        dateCreated: { type: Date, default: Date.now },
    })

const Portfolio = model('Portfolio', PortfolioSchema)

module.exports = Portfolio;
