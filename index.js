const { Router } = require('express')
const { generateTableRouter } = require( './factories/router.js')
const createHttpError = require( 'http-errors')

// Note: Middleware cannot be async
module.exports = (prismaClient, opts = {}) => {

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
                if (!model) throw createHttpError(404, `Model ${modelName} does not exist`)
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