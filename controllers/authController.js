import { ACCESS_TOKEN_NAME } from '../constants/index.js'
import { ValidationError } from '../errors/ValidationError.js'
import { UserRepository } from '../user-repository.js'

export class AuthController {
  static async login (req, res) {
    const { username, password } = req.body
    if (!username || !password) throw new ValidationError('both fields are required')

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
  }

  static async register (req, res) {
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
  }

  static async logout (req, res) {
    req.clearCookie(ACCESS_TOKEN_NAME).json({ success: true, message: 'Logged out successfully' })
  }
}
