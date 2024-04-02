import './aliases'
import express from 'express'
import { config } from 'dotenv'
import modules from './modules'

config()

const PORT = process.env.PORT || 4000
const app = express()

app.use('/api', modules)

function start() {
    try {
        app.listen(PORT, () => console.log(`Server started on port:${PORT}`))
    } catch (error) {
        const e = error as Error
        console.log(e.message)
    }
}

start()