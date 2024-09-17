// Aquí creamos los métodos necesarios para registrar y verificar usuarios y admins

const User = require("../models/User.model")
const jwt = require("jsonwebtoken")

/* Creamos una función para realizar el signup del user
Pasamos user como parámetro y retornamos el token "firmado" con el id, role, el secreto y la fecha de expiración.

*/

const signupToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JTW_SECRET, { expiresIn: "1d" })
}

/* Como queremos exportar la siguiente función de registro, la hacemos async,
hacemos un try-catch y desestructuramos todos los parámetros que tendrá el body,
crearemos una variable para crear un usuario nuevo y luego lo guardaaremos.
Igualmente, crearemos la variable token para guardar el token de signin del usuario */

exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const user = new User({ username, email, password, role })
        await user.save()

        const token = signupToken(user)
        res.status(201).json({ token })
    } catch (error) {
        res.status(500).json({ error: 'Hubo un problema creando el usuario' })
    }
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' })
        }

        const isMatch = await user.comparaPassword(password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' })
        }
        const token = signupToken(user)
        res.status(200).json(token)
    } catch (error) {
        res.json({ error: 'Hubo un problema en el login' })
    }
}