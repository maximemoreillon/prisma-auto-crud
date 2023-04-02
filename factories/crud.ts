import { Response, Request, NextFunction } from "express"

// FIXME: stop using "id" as primary key

export const genrateItemCreate =
  (prismaTableController: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body
      const newItem = await prismaTableController.create({ data })
      res.send(newItem)
    } catch (error) {
      next(error)
    }
  }

export const genrateItemsRead =
  (prismaTableController: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        skip = 0,
        take = 100,
        sort = "id",
        order = "desc",
        ...rest
      } = req.query

      // Note: offset pagination does not scale well
      // https://www.prisma.io/docs/concepts/components/prisma-client/pagination#-cons-of-offset-pagination
      const query = {
        skip: Number(skip),
        take: Number(take),
        orderBy: [{ [sort as string]: order }],
        where: { ...rest },
      }

      const items = await prismaTableController.findMany(query)

      const total = await prismaTableController.count({ where: { ...rest } })

      res.send({ skip, take, total, items })
    } catch (error) {
      next(error)
    }
  }

export const genrateItemRead =
  (prismaTableController: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { primaryKey } = req.params
      let { includes = [] } = req.query

      if (typeof includes === "string") includes = [includes]

      const query: any = { where: { id: Number(primaryKey) } }
      if (includes.length)
        //@ts-ignore
        query.include = includes.reduce(
          (prev: any, i: any) => ({ ...prev, [i]: true }),
          {}
        )

      const item = await prismaTableController.findUnique(query)
      res.send(item)
    } catch (error) {
      next(error)
    }
  }

export const genrateItemUpdate =
  (prismaTableController: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body
      const { primaryKey } = req.params

      const query = { where: { id: Number(primaryKey) }, data }

      const itemUpdate = await prismaTableController.update(query)
      res.send(itemUpdate)
    } catch (error) {
      next(error)
    }
  }

export const genrateItemDelete =
  (prismaTableController: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { primaryKey } = req.params
      const query = { where: { id: Number(primaryKey) } }
      const itemDelete = await prismaTableController.delete(query)
      res.send(itemDelete)
    } catch (error) {
      next(error)
    }
  }
