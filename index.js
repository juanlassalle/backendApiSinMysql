import express from 'express'
import http from 'http'
import dotenv  from 'dotenv/config.js'
import UserRoutes from './routes/Users.js'

const app = express()
const server = http.createServer(app)

//Si el entorno es de produccion no se carga esto
if (process.env.NODE_ENV !== "production") {
    dotenv
}

const {PORT} = process.env

//Middleware puente entre funciones
app.use(express.json())

UserRoutes(app)


server.listen(PORT, () => {
    console.log(`El servidor se escucha en el puerto ${PORT}`)
})