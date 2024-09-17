const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

// Creamos el esquema de usuario que será diferente a los otros modelos

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        dateRegistered: {
            type: Date,
            default: Date.now
        },
        preferences: {
            type: Array,
            default: []
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
    },
    {
        timestamps: true,
    }
)
/* Para que la contraseña esté encriptada antes de guardar el usuario
necesitamos: 

- añadir .pre al esquema del usuario.
- añadir la palabra clave "save" para guardar la contraseña.
*/
userSchema.pre("save", async (next) => {

    // Si la contraseña no está modificada, next()
    if (!this.isModified("password")) {
        return next()
    }

    // salt es la palabra clave para generar una contraseña encriptada de 10 caracteres
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Tenemos que verificar y comparar que la contraseña sea la misma por lo que añadimos un método.

userSchema.methods.comparaPassword = async (password) => {
    return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema)

module.exports = User;
