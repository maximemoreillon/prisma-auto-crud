// This file is used in the Docker container

import express from "express"
import cors from "cors"
import prismaAutoCrud from "./index"
import prismaClient from "./prismaClient"
import dotenv from "dotenv"
import { Response, Request } from "express"

dotenv.config()

const { PORT = 80 } = process.env

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send({
    application_name: "Prisma Auto CRUD",
  })
})

app.use(prismaAutoCrud(prismaClient))

app.listen(PORT, () => {
  console.log(`[Express] Listening on port ${PORT}`)
})
