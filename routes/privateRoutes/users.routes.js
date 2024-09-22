const isAdmin = require("../../middleware/admin.middleware");
const { isAthenticated } = require("../../middleware/auth.middleware");
const User = require("../../models/User.model"); // Import User model
const router = require("express").Router();

router.get("/me", isAthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener información del usuario requerido" })
    }
})

router.get("/users", isAdmin, isAthenticated, async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) return res.status(400).json({ error: "No hay usuarios" })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la lista de usuarios" })
    }
})

module.exports = router;