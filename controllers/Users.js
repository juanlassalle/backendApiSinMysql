import UsersData from "../dataModels/Users.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config.js'

//Si el entorno es de produccion no se carga esto
if (process.env.NODE_ENV !== "production") {
    dotenv
}

const {KEY} = process.env
let newUser = {}
let users = []

const register = async (req,res) => {
    try {
        if (!req.body) {
            res.status(400).send("Debes indicar nombre, email, password")
        }
        const {name, email, password }= req.body

        if(!(name && email && password)){
            res.status(400).send('Debes indicar nombre, email, password')
        }

        const userExists = users.find( user => user.email === email)

        if (userExists) {
            res.status(400).send('El usuario existe, por favor inicia sesión con tus credenciales')
        }
        const encryptedPassword = await bcrypt.hash(password, 10)
        newUser = UsersData(name, email, encryptedPassword)

        users = [...users, newUser]
    } catch (error) {
        console.log('Ha ocurrido un error', error)
    }

    return res.status(201).json(newUser)
}

const login = async (req,res) => {
    try {
        const {email, password} = req.body

        if (!(email && password)) {
            res.status(400).send('Indica email y contraseña')
        }

        const user = users.find(us => us.email === email)

        // si el usuario existe y las contraseña coinciden se retorna un token
        if (user && (await bcrypt.compare(password,user.password))) {
            const token = jwt.sign({email},KEY,{expiresIn: '2h'})
            user.token = token
            res.status(200).json(user)
        }else{
            res.status(403).send('Credenciales Inválidas')
        }
    } catch (error) {
        console.log('Ha ocurrido un error', error)
    }
}

export {
    register,
    login
}