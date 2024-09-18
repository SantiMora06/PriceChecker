const { model, Schema } = require('mongoose');

const WishlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assets: [{
        type: { type: String, enum: ["crypto", "stock", "commodity"], required: true },
        symbol: { type: String, required: true },
        name: { type: String, required: true }
    },],
},
    {
        timestamps: true
    });

const Wishlist = model('Wishlist', WishlistSchema)
module.exports = Wishlist;