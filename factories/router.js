import { Router } from 'express'
import {
    genrateItemCreate,
    genrateItemsRead,
    genrateItemRead,
    genrateItemUpdate,
    genrateItemDelete
} from './crud.js'



export const generateTableRouter = (prismaTableController) => {
    const router = Router()

    router.route('/')
        .post(genrateItemCreate(prismaTableController))
        .get(genrateItemsRead(prismaTableController))

    router.route('/:id')
        .get(genrateItemRead(prismaTableController))
        .put(genrateItemUpdate(prismaTableController))
        .delete(genrateItemDelete(prismaTableController))

    return router
}