import prisma from '../prismaClient.js'

export const genrateItemCreate = (tableName) => {

    return async (req, res, next) => {

        try {
            const data = req.body
            const newItem = await prisma[tableName].create({ data })
            res.send(newItem)
        } catch (error) {
            next(error)
        }

    }
}

export const genrateItemsRead = (tableName) => {

    return async (req, res, next) => {

        try {
            const query = {}
            const items = await prisma[tableName].findMany(query)
            res.send(items)
        } catch (error) {
            next(error)
        }

    }
}

export const genrateItemRead = (tableName) => {

    return async (req, res, next) => {

        try {
            const { id } = req.params
            const query = { where: { id: Number(id) } }
            const item = await prisma[tableName].findUnique(query)
            res.send(item)
        } catch (error) {
            next(error)
        }

    }
}


export const genrateItemUpdate = (tableName) => {

    return async (req, res, next) => {

        try {
            const data = req.body
            const { id } = req.params

            const query = {
                where: { id: Number(id) },
                data
            }

            const itemUpdate = await prisma[tableName].update(query)
            res.send(itemUpdate)
        } catch (error) {
            next(error)
        }

    }
}


export const genrateItemDelete = (tableName) => {

    return async (req, res, next) => {

        try {
            const { id } = req.params
            const query = { where: { id: Number(id) } }
            const itemDelete = await prisma[tableName].delete(query)
            res.send(itemDelete)
        } catch (error) {
            next(error)
        }

    }
}