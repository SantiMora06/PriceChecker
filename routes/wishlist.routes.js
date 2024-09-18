const Wishlist = require("../models/WishList.model")
const router = require("express").Router()
const { isAthenticated } = require("../middleware/auth.middleware")

router.get("/", isAthenticated, async (req, res, next) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("user")
        if (!wishlist) return res.status(404).status({ error: "Wishlist not found" })
        res.json(wishlist)
    } catch (error) {
        next(error)
    }
})

router.put("/", isAthenticated, async (req, res, next) => {
    const { type, symbol, name } = req.body;
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id })
        if (!wishlist) wishlist = new Wishlist({ user: req.user._id, assets: [] })

        wishlist.assets.push({ type, symbol, name })
        await wishlist.save();
        res.json(wishlist)
    } catch (error) {
        next(error)
    }
})

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