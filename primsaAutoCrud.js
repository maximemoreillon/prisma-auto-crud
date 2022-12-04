import { Router } from 'express'
import { generateTableRouter } from './factories/router.js'


// Node: Middleware cannot be async
export const prismaAutoCrud = (prismaClient) => {

    const router = Router()

    prismaClient._getDmmf()
        .then(dmmf => {


            const models = dmmf.datamodel.models
            const tables = models.map(model => model.name)

            router.get('/models', (req, res) => {
                res.send(models)
            })

            router.get('/models/:modelName', (req, res) => {
                const { modelName } = req.params
                const model = dmmf.modelMap[modelName]
                res.send(model)
            })



            router.get('/tables', (req, res) => {
                // Redundant with above
                res.send(tables)
            })

            // Generate routes and their controllers for each table
            tables.forEach(tableName => {
                const tableRoute = `/${tableName}`
                const prismaTableController = prismaClient[tableName]
                const tableRouter = generateTableRouter(prismaTableController)
                router.use(tableRoute, tableRouter)

            })
        })
    
    return router
}