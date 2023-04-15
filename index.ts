// This file is the middleware
import { Router, Request, Response } from "express"
import { generateTableRouter } from "./factories/router"
import createHttpError from "http-errors"

// Note: Middleware cannot be async
// TODO: find types
const middleware = (prismaClient: any, opts = {}) => {
  const router = Router()

  prismaClient._getDmmf().then((dmmf: any) => {
    const models = dmmf.datamodel.models

    router.get("/models", (req: Request, res: Response) => {
      res.send(models)
    })

    router.get("/models/:modelName", (req: Request, res: Response) => {
      const { modelName } = req.params
      const model = dmmf.modelMap[modelName]
      if (!model)
        throw createHttpError(404, `Model ${modelName} does not exist`)
      res.send(model)
    })

    // Generate routes and their controllers for each table
    models.forEach((model: any) => {
      const { name, fields } = model
      const tableRoute = `/${name}`
      const prismaTableController = prismaClient[name]

      // Adding the field used as id
      prismaTableController.primaryKeyField = fields.find(
        ({ isId }: any) => isId
      )?.name

      const tableRouter = generateTableRouter(prismaTableController)
      router.use(tableRoute, tableRouter)
    })
  })

  return router
}

export = middleware
