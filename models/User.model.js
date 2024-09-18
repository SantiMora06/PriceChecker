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
        passwordHash: {
            type: String,
            required: true
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


const User = model('User', userSchema)

module.exports = User;
