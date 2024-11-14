import 'dotenv/config'

import DbLocal from 'db-local'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { Schema } = new DbLocal({ path: './db' })

const UserSchema = Schema('User', {
  _id: { required: true, type: String },
  username: { required: true, type: String },
  password: { required: true, type: String }
})

export class UserRepository {
  static async createUser ({ username, password }) {
    // todo: validate data
    if (!username || !password) throw Error('both fields are required')
    const alreadyUser = UserSchema.findOne({ username })

    if (alreadyUser) throw Error('The username is already in use')

    const id = crypto.randomUUID()
    const passwordHashed = await bcrypt.hash(password, 10)
    UserSchema.create({
      _id: id,
      username,
      password: passwordHashed
    }).save()

    const token = jwt.sign({ username, id }, process.env.SECRET_KEY, { expiresIn: '1h' })

    return token
  }

  static async login ({ username, password }) {
    if (!username || !password) throw Error('both fields are required')
    const userFound = UserSchema.findOne({ username })

    if (!userFound) throw new Error('credentiasl invalid')

    const credentialsValid = await bcrypt.compare(password, userFound.password)
    if (!credentialsValid) throw new Error('credentials invalid')

    const token = jwt.sign({
      username: userFound.username, id: userFound._id
    }, process.env.SECRET_KEY, { expiresIn: '1h' })

    return token
  }
}
