const jtw = require('jsonwebtoken')

exports.protect = (req, res, next) => {

    // El token viene desde el headers de authorization

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: 'No autorizado, token no proporcionado' })
    }

    /* jtw.verify es una función de la librería jtw que verifica la validez 
    del token y requiere 3 parámetros:

    - El token que se desea verificar
    - process.env.JWT_SECRET que es la clave secreta utilizada para firmar
    el token.
    - una callback function que se ejecuta tras intentar verificar el token
    (Si el token es inválido o expiró => error, si el token es válido contendrá
    la información decodificada del token)
    */

    jtw.verify(token, process.env.JTW_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({ error: 'Token inválido' })
        }
        req.user = decoded; // Guardamos la información del usuario en req.user
        next();
    })
}

exports.adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: 'Acceso denegado, solo admins' })
    }
    next()
}