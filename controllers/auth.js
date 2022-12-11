import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from '../model/user.js'

const jwtSecret = process.env.TOKEN_KEY

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
      .then((user) => {
        const maxAge = 3 * 60 * 60
        const token = jwt.sign({ id: user._id, username }, jwtSecret, {
          expiresIn: maxAge,
        })
        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        })
        res.status(201).json({
          message: 'User successfully created',
          user: user._id,
        })
      })
      .catch((err) =>
        res.status(401).json({
          message: 'User not successful created',
          error: err.mesage,
        }),
      )
  })
}

export const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({
      message: 'Username or Password not present',
    })
  }
  try {
    const user = await UserModel.findOne({ username })
    if (!user) {
      res.status(401).json({
        message: 'Login not successful',
        error: 'User not found',
      })
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge,
            },
          )
          res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
          })
          res.status(201).json({
            message: 'User successfully Logged in',
            user: user._id,
          })
        } else {
          res.status(400).json({ message: 'Login not succesful' })
        }
      })
    }
  } catch (error) {
    res.status(400).json({
      message: 'An error occurred',
      error: error.message,
    })
  }
}
