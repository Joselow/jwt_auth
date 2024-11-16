import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_NAME } from '../constants/index.js'

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies[ACCESS_TOKEN_NAME]

  if (!token) return res.status(400).json({ success: false, error: 'without token' })
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY)
    console.log(token)
    req.data = data

    next()
  } catch (error) {
    if (!token) res.status(400).json({ success: false, error: 'bad token' })
  }
}
