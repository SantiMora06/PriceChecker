const jwt = require('jsonwebtoken')
const secret = require("../config/secretGenerator")


exports.isAthenticated = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.satus(401).json({ message: "Token no provisto" })
    }
    const token = authHeader.split(" ")[1];


    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Token inválido" })
        }
        req.user = decoded
        next()
    })

}
