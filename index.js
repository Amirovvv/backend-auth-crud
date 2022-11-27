import express from 'express'
import * as dotenv from 'dotenv'
import { connect } from './config/db.js'
import { authRouter } from './routes/auth.js'

dotenv.config()

const app = express()
connect()

const PORT = process.env.PORT_API

app.use(express.json())
app.use('/api/auth', authRouter)

app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`))
