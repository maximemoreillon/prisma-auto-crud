import { Router } from 'express'
import {
    genrateItemCreate,
    genrateItemsRead,
    genrateItemRead,
    genrateItemUpdate,
    genrateItemDelete
} from './crud.js'



export const generateTableRouter = (tableName) => {
    const router = Router()

    router.route('/')
        .post(genrateItemCreate(tableName))
        .get(genrateItemsRead(tableName))

    router.route('/:id')
        .get(genrateItemRead(tableName))
        .put(genrateItemUpdate(tableName))
        .delete(genrateItemDelete(tableName))

    return router
}