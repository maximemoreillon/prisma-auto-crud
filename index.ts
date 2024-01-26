// This file is the middleware
import { Router, Request, Response } from "express"
import { generateTableRouter } from "./factories/router"
import createHttpError from "http-errors"
import { PrismaClient } from "@prisma/client"

// Note: Middleware cannot be async
const middleware = (prismaClient: PrismaClient, opts = {}) => {
  const router = Router()

  // @ts-ignore
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
  modelNames.forEach((name: any) => {
    const { fields } = modelsMap[name]
    const tableRoute = `/${name}`
    const prismaTableController: any = prismaClient[name]

    // Adding the field used as id
    prismaTableController.primaryKeyField = fields.find(
      ({ isId }: any) => isId
    )?.name

    const tableRouter = generateTableRouter(prismaTableController)
    router.use(tableRoute, tableRouter)
  })

  return router
}

export default middleware
