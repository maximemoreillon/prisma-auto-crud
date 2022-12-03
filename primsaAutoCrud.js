import { Router } from 'express'
import { generateTableRouter } from './factories/router.js'

export const prismaAutoCrud = (prismaClient) => {

    const router = Router()

    const tables = Object.keys(prismaClient)
        .filter(k => !k.startsWith('_') && !k.startsWith('$'))
    
    router.get('/tables', (req, res) => {
        res.send(tables)
    })

    // Generate routes and their controllers for each table
    tables.forEach(tableName => {
        const tableRoute = `/${tableName}`
        const prismaTableController = prismaClient[tableName]
        const tableRouter = generateTableRouter(prismaTableController)
        router.use(tableRoute, tableRouter)
    })

    return router
}