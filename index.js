import express from 'express'
import { UserRepository } from './user-repository.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  console.log('xda')
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    return res.json({ user })
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
})
app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const id = await UserRepository.createUser({ username, password })
    return res.json({ id })
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
})
app.post('/logout', (req, res) => {

})
app.post('/protected', (req, res) => {

})

const PORT = process.env.PORT || 3000

app.listen(PORT, (req, res) => {
  console.log('running in www://localhost::', PORT)
})
