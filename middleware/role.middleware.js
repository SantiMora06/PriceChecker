const roleMiddleware = (roles) => {

    return async (req, res, next) => {
        if (req.user) {
            if (roles.includes(req.user.role)) {
                return next()
            }
            return res.status(403).json({ message: `Este usuario no tiene el rol deseado, es: ${req.user.role}` })
        }
        return res.status(401).json({ message: "No autorizado, usuario no autentificado" })
    }
};

module.exports = { roleMiddleware }