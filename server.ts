// This file is used in the Docker container
import dotenv from "dotenv"
dotenv.config()

import express from "express"
import "express-async-errors"
import cors from "cors"
import prismaAutoCrud from "./index"
import prismaClient from "./prismaClient"

import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./swagger-output.json"

import { Response } from "express"
import { version, author } from "./package.json"

console.log(`Auto CRUD v${version}`)

const { PORT = 80 } = process.env

export const app = express()
app.use(cors())
app.use(express.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/", (_, res: Response) => {
  res.send({
    application: "Auto CRUD",
    version,
    author,
  })
})

app.use(prismaAutoCrud(prismaClient))

app.listen(PORT, () => {
  console.log(`[Express] Listening on port ${PORT}`)
})
