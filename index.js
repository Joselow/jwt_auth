import 'dotenv/config'

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { isAuthenticated } from './midlewares/isAuthMidleware.js'
import { AuthController } from './controllers/authController.js'
import { manageErrors } from './midlewares/manageErrorsMidleware.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: true, // Permitir todos los orígenes
  credentials: true // Permitir el uso de credenciales (cookies, tokens)
}))

app.use(manageErrors)

app.get('/', (req, res) => {
  res.json({
    message: 'auth with jwt :)'
  })
})

app.post('/login', AuthController.login)
app.post('/register', AuthController.register)

app.post('/logout', AuthController.logout)

app.get('/protected', isAuthenticated, (req, res) => {
  res.json({ success: true, message: 'xd' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, (req, res) => {
  console.log('running in http://localhost:' + PORT)
})
