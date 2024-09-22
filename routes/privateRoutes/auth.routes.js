// Antes de iniciar las rutas, tenemos que importar los métodos y middleware
const isAdmin = require("../../middleware/admin.middleware")
const bcrypt = require("bcryptjs")
const router = require("express").Router()
const User = require("../../models/User.model")
const jwt = require("jsonwebtoken")
const secret = require("../../config/secretGenerator")
const { isAthenticated } = require("../../middleware/auth.middleware")

router.get("/", (req, res) => {
    res.json("All good in auth")
})

router.post("/register", async (req, res, next) => {
    const salt = bcrypt.genSaltSync(12)
    const passwordHash = bcrypt.hashSync(req.body.password, salt)

    try {
        const newUser = await User.create({ ...req.body, passwordHash })
        const { username, email, role } = newUser;
        const user = { username, email, role };
        res.status(201).json(user)
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Username or email already exists" })
        }
        next(error)
    }
})

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const potentialUser = await User.findOne({ username });

        if (potentialUser) {
            if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
                const payload = {
                    userId: potentialUser._id,
                    username: potentialUser.username,
                    role: potentialUser.role,
                }
                const authToken = jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: "6h" })
                res.json({ token: authToken })
            } else {
                res.status(403).json({ message: "Incorrect password" })
            }
        } else {
            res.status(404).json({ message: "Username or password incorrect" })
        }
    } catch (error) {
        next(error)
    }
});

router.get("/dashboard", isAthenticated, (req, res) => {
    res.status(200).json({ message: 'Acceso permitido para usuarios verificados', user: req.user })
})
router.get("/admin", isAthenticated, isAdmin, (req, res) => {
    res.status(200).json({ message: 'Acceso permitido a administradores', user: req.user })
})

module.exports = router;