const isAdmin = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({ error: "No tienes credenciales de administrador." })
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Acceso denegado. Solo administradores" })
    }
    next()

}

module.exports = isAdmin;