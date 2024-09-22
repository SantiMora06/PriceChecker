const Wishlist = require("../../models/WishList.model")
const router = require("express").Router()
const { isAthenticated } = require("../../middleware/auth.middleware")
const isAdmin = require("../../middleware/admin.middleware");


// Get one wishlist

router.get("/", isAthenticated, async (req, res, next) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("user")
        if (!wishlist) return res.status(404).json({ error: "Wishlist not found" })
        res.json(wishlist)
    } catch (error) {
        next(error)
    }
})

// Get all wishlists

router.get("/all-wishlists", isAthenticated, isAdmin, async (req, res, next) => {
    try {
        const wishlist = await Wishlist.find().populate("user")
        if (!wishlist) return res.status(404).json({ error: "No wishlists were found" })
        res.json(wishlist)
    } catch (error) {
        next(error)
    }
});


// Edit and add one product on the wishlist;
router.put("/", isAthenticated, async (req, res, next) => {
    const { type, symbol, name } = req.body;

    if (!type || !symbol || !name) return res.status(404).json({ error: "All fields (type, symbol, name) are required" })
    try {

        let wishlist = await Wishlist.findOne({ user: req.user._id })

        if (!wishlist) wishlist = new Wishlist({ user: req.user._id, assets: [] })

        const assetExists = wishlist.assets.some(asset => asset.symbol === symbol)
        if (assetExists) return res.status(400).json({ error: "Asset already in the wishlist" })

        wishlist.assets.push({ type, symbol, name })
        await wishlist.save();

        res.json(wishlist)
    } catch (error) {
        next(error)
    }
})

// Delete a product from the wishlist
router.delete("/:symbol", isAthenticated, async (req, res, next) => {
    const { symbol } = req.params;

    try {
        const wishlist = await Wishlist.findOneAndUpdate(
            { user: req.user._id },
            { $pull: { assets: { symbol } } },
            { new: true }
        );

        if (!wishlist) return res.status(404).json({ error: "Wishlist not found" })
        res.json(wishlist)
    } catch (error) {
        next(error)
    }
})

module.exports = router;