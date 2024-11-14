import 'dotenv/config'

import express from 'express'
import { UserRepository } from './user-repository.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { isAuthenticated } from './isAuthMidleware.js'
import { ACCESS_TOKEN_NAME } from './constants/index.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: true, // Permitir todos los orígenes
  credentials: true // Permitir el uso de credenciales (cookies, tokens)
}))

app.get('/', (req, res) => {
  res.json({
    message: 'hello world'
  })
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const data = await UserRepository.login({ username, password })
    return res.cookie('access_token', data, {
      httpOnly: true, // solo servidor
      // secure: process.env.NODE_ENV === 'production',
      secure: true, // Permite que la cookie funcione sin HTTPS
      sameSite: 'None',
      maxAge: 1000 * 60 * 60
    })
      .json({ data, success: true })
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false })
  }
})
app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const data = await UserRepository.createUser({ username, password })
    return res.cookie('access_token', data, {
      httpOnly: true, // solo servidor
      secure: process.env.NODE_ENV === 'production',
      sameSite: true, // mismo dominio
      maxAge: 1000 * 60 * 60
    })
      .json({ data, success: true })
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false })
  }
})
app.post('/logout', (req, res) => {
  req.clearCookie(ACCESS_TOKEN_NAME).json({ success: true, message: 'Logged out successfully' })
})
app.get('/protected', isAuthenticated, (req, res) => {
  res.json({ success: true, message: 'xd' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, (req, res) => {
  console.log('running in http://localhost:' + PORT)
})
