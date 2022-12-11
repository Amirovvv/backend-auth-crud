import express from 'express'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connect } from './config/db.js'
import { authRouter } from './routes/auth.js'
import { userAuth } from './middleware/auth.js'

dotenv.config()

const app = express()
connect()

const PORT = process.env.PORT_API

app.use(express.json())
app.use('/api/auth', authRouter)
app.use(cookieParser())

app.get('/basic', userAuth, (req, res) => res.send('User Route'))

app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`))
