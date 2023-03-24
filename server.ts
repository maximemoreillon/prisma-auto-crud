// This file is used in the Docker container

import express from "express"
import cors from "cors"
import prismaAutoCrud from "./index.js"
import prismaClient from "./prismaClient.js"
import dotenv from "dotenv"

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
