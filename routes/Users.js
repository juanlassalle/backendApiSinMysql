import {login, register} from "../controllers/Users.js"
import verifyToken from "../middlewares/auth.js"

const UserRoutes = (app) => {
    app.post('/login', (req,res) => {
        return login(req,res)
    })
    app.post('/register', (req,res) => {
        return register(req,res)
    })
    app.post('/welcome',verifyToken, (req,res) => {
        res.status(200).send('Bienvenido a la apicación')
    })
}

export default UserRoutes