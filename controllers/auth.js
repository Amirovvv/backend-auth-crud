import bcrypt from 'bcryptjs'
import { UserModel } from '../model/user.js'

export const register = async (req, res, next) => {
  const { username, password } = req.body
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password less than 6 characters' })
  }
  bcrypt.hash(password, 10).then(async (hash) => {
    await UserModel.create({
      username,
      password: hash,
    })
      .then((user) =>
        res.status(200).json({
          message: 'User successfully created',
          user,
        }),
      )
      .catch((err) =>
        res.status(401).json({
          message: 'User not successful created',
          error: err.mesage,
        }),
      )
  })
}
