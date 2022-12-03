
export const genrateItemCreate = (prismaTableController) => {

    return async (req, res, next) => {

        try {
            const data = req.body
            const newItem = await prismaTableController.create({ data })
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
            const items = await prismaTableController.findMany(query)
            res.send(items)
        } catch (error) {
            next(error)
        }

    }
}

export const genrateItemRead = (prismaTableController) => {

    return async (req, res, next) => {

        try {
            const { id } = req.params
            const query = { where: { id: Number(id) } }
            const item = await prismaTableController.findUnique(query)
            res.send(item)
        } catch (error) {
            next(error)
        }

    }
}


export const genrateItemUpdate = (prismaTableController) => {

    return async (req, res, next) => {

        try {
            const data = req.body
            const { id } = req.params

            const query = {
                where: { id: Number(id) },
                data
            }

            const itemUpdate = await prismaTableController.update(query)
            res.send(itemUpdate)
        } catch (error) {
            next(error)
        }

    }
}


export const genrateItemDelete = (prismaTableController) => {

    return async (req, res, next) => {

        try {
            const { id } = req.params
            const query = { where: { id: Number(id) } }
            const itemDelete = await prismaTableController.delete(query)
            res.send(itemDelete)
        } catch (error) {
            next(error)
        }

    }
}