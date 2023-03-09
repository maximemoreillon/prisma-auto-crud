// This file is used in the Docker container

const express = require("express")
const cors = require("cors")
const prismaAutoCrud = require("./index.js")
const prismaClient = require("./prismaClient.js")

const { PORT = 80 } = process.env

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send({
    application_name: "Prisma Auto CRUD",
  })
})

// Endpoint to kill process, used for restart in K8s
app.post('/exit', (req, res) => {
  res.send('OK')
  process.exit(0)
})

app.use(prismaAutoCrud(prismaClient))

app.listen(PORT, () => {
  console.log(`[Express] Listening on port ${PORT}`)
})
