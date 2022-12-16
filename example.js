const express = require( 'express')
const cors = require( 'cors')
const { prismaAutoCrud } = require( './index.js')
const prismaClient = require( './prismaClient.js')

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

app.use(prismaAutoCrud(prismaClient))


app.listen(PORT, () => {
    console.log(`[Express] Listening on port ${PORT}`)
})