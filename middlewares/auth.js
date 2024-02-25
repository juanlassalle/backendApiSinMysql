import  jwt  from "jsonwebtoken";
import dotenv  from 'dotenv/config.js'

//Si el entorno es de produccion no se carga esto
if (process.env.NODE_ENV !== "production") {
    dotenv
}

const {KEY} = process.env

const verifyToken = (req,res, next) => {
    const token = req.headers["x-access-token"]

    if (!token) {
        return res.status(403).send("No se ha enviado el token de autenticación")
    }

    try {
        const decode = jwt.verify(token, KEY)
        req.user = decode
    } catch (error) {
        return res.status(401).send('Token inválido')
    }

    return next()
}

export default verifyToken