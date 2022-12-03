import prisma from './prismaClient.js'
import express from 'express'
import cors from 'cors'

import { prismaAutoCrud } from './primsaAutoCrud.js'

const {
    PORT = 7070
} = process.env


const app = express()
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send({
        application_name: 'Prisma Auto CRUD example'
    })
})

app.use(prismaAutoCrud(prisma))





app.listen(PORT, () => {
    console.log(`[Express] Listening on port ${PORT}`)
})