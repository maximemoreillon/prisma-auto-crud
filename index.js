import prisma from './prismaClient.js'
import express from 'express'
import cors from 'cors'

import { generateTableRouter } from './factories/router.js'

const {
    PORT = 7070
} = process.env

const tables = Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$'))

const app = express()
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send({
        tables
    })
})

// Generate routes and their controllers for each table
tables.forEach(table => {
    const route = `/${table}s`
    const router = generateTableRouter(table)
    app.use(route, router)
})


app.listen(PORT, () => {
    console.log(`[Express] Listening on port ${PORT}`)
})