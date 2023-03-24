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
    const tables = models.map((model: any) => model.name)

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

    router.get("/tables", (req: Request, res: Response) => {
      // Redundant with above
      res.send(tables)
    })

    // Generate routes and their controllers for each table
    tables.forEach((tableName: string) => {
      const tableRoute = `/${tableName}`
      const prismaTableController = prismaClient[tableName]
      const tableRouter = generateTableRouter(prismaTableController)
      router.use(tableRoute, tableRouter)
    })
  })

  return router
}

export = middleware
