import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

const db = process.env.DB_URL

const connectDB = async () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Successfully connected to database')
    })
    .catch((error) => {
      console.log('database connection failed. exiting now...')
      console.error(error)
      process.exit(1)
    })
}

export const connect = connectDB
