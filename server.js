// This file is used in the Docker container

const express = require("express")
const cors = require("cors")
const prismaAutoCrud = require("./index.js")
const prismaClient = require("./prismaClient.js")
const dotenv = require("dotenv")

dotenv.config()

const { PORT = 80 } = process.env

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send({
    application_name: "Prisma Auto CRUD",
  })
})

app.use(prismaAutoCrud(prismaClient))

app.listen(PORT, () => {
  console.log(`[Express] Listening on port ${PORT}`)
})
