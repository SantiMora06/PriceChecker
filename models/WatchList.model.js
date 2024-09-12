const { model, Schema } = require('mongoose');

const WatchlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    symbols: [{
        type: String
    }],
});

const Watchlist = model('WatchList', WatchlistSchema)
module.exports = Watchlist;