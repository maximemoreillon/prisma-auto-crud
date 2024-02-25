// This file exports the middleware
import { Router, Request, Response } from "express"
import { generateTableRouter } from "./factories/router"
import { PrismaClient } from "@prisma/client"
import createHttpError from "http-errors"

interface ModelField {
  isId: boolean
  name: string
}

interface Model {
  fields: ModelField[]
}

interface ExtendedPrismaClient extends PrismaClient {
  _runtimeDataModel: {
    models: { [index: string]: Model }
  }
}

// TODO: extend generic Delegate
export interface TableController {
  primaryKeyField: string
  create: Function
  findMany: Function
  findUnique: Function
  update: Function
  delete: Function
  count: Function
}

// Note: Middleware cannot be async
export default (prismaClient: ExtendedPrismaClient, opts = {}) => {
  const options = {
    // Defaults come here
    ...opts,
  }
  const router = Router()

  const modelsMap = prismaClient._runtimeDataModel.models

  const modelNames = Object.keys(modelsMap)

  router.get("/models", (_, res: Response) => {
    res.send(modelNames)
  })

  router.get("/models/:modelName", (req: Request, res: Response) => {
    const { modelName } = req.params
    const model = modelsMap[modelName]
    if (!model) throw createHttpError(404, `Model ${modelName} does not exist`)
    res.send(model)
  })

  // Generate routes and their controllers for each table
  modelNames.forEach((name) => {
    const { fields } = modelsMap[name]
    const tableRoute = `/${name}`

    const prismaTableController = (prismaClient as any)[name]

    // Adding the field used as id
    prismaTableController.primaryKeyField = fields.find((f) => f.isId)?.name

    const tableRouter = generateTableRouter(prismaTableController, options)
    router.use(tableRoute, tableRouter)
  })

  return router
}
