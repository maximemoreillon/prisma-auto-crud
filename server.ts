// This file is used in the Docker container
import dotenv from "dotenv"
dotenv.config()

import express from "express"
import "express-async-errors"
import cors from "cors"
import prismaAutoCrud from "./index"
import prismaClient from "./prismaClient"
import auth from "@moreillon/express_identification_middleware"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./swagger-output.json"
import { Response } from "express"
import { version, author } from "./package.json"

console.log(`Auto CRUD v${version}`)

const { PORT = 80, READ_ONLY, IDENTIFICATION_URL } = process.env

const options = {
  readonly: !!READ_ONLY,
}

export const app = express()
app.use(cors())
app.use(express.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get("/", (_, res: Response) => {
  res.send({
    application: "Auto CRUD",
    version,
    author,
    options,
    identifcation_url: IDENTIFICATION_URL,
  })
})

if (IDENTIFICATION_URL) app.use(auth({ url: IDENTIFICATION_URL }))

app.use(prismaAutoCrud(prismaClient, options))
app.listen(PORT, () => {
  console.log(`Express Listening on port ${PORT}`)
})
