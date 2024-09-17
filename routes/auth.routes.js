// Antes de iniciar las rutas, tenemos que importar los métodos y middleware

const { register, login } = require('../controllers/auth.controller')
const { protect, adminOnly } = require('../middleware/auth.middleware')
const router = require("express").Router()

router.post("/register", register);
router.post("/login", login)
router.get("/dashboard", protect, (req, res) => {
    res.status(200).json({ message: 'Acceso permitido para usuarios verificados', user: req.user })
})
router.get("/admin", protect, adminOnly, (req, res) => {
    res.status(200).json({ message: 'Acceso permitido a administradores', user: req.user })
})

module.exports = router;