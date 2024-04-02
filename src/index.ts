import './aliases'
import express from 'express'
import { config } from 'dotenv'
import bodyParser from 'body-parser'
import modules from './modules'
import connectToMongo from './db/connection'

config()

const PORT = process.env.PORT || 4000
const app = express()

app.use(bodyParser.json())
app.use('/api', modules)

function start() {
    try {
        app.listen(PORT, () => {
            connectToMongo()
            console.log(`Server started on port:${PORT}`)
        })
    } catch (error) {
        const e = error as Error
        console.log(e.message)
    }
}

start()