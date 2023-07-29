import { Response, Request, NextFunction } from "express"

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
        search,
        include,
        ...rest
      } = req.query as any

      // Note: offset pagination does not scale well
      // https://www.prisma.io/docs/concepts/components/prisma-client/pagination#-cons-of-offset-pagination
      const query = {
        where: { ...rest, ...(search ? JSON.parse(search) : undefined) },
      }

      const fullQuery = {
        ...query,
        skip: Number(skip),
        take: Number(take),
        orderBy: [{ [sort as string]: order }],
        include: include ? JSON.parse(include) : undefined,
      }

      const items = await prismaTableController.findMany(fullQuery)

      const total = await prismaTableController.count(query)

      res.send({ skip, take, total, items })
    } catch (error) {
      next(error)
    }
  }

export const genrateItemRead =
  (prismaTableController: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { primaryKeyField } = prismaTableController
      const { primaryKey } = req.params
      let { includes = [] } = req.query

      if (typeof includes === "string") includes = [includes]

      const query: any = { where: { [primaryKeyField]: Number(primaryKey) } }
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
      const { primaryKeyField } = prismaTableController
      const { primaryKey } = req.params
      const data = req.body

      const query = { where: { [primaryKeyField]: Number(primaryKey) }, data }

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
      const { primaryKeyField } = prismaTableController
      const { primaryKey } = req.params
      const query = { where: { [primaryKeyField]: Number(primaryKey) } }
      const itemDelete = await prismaTableController.delete(query)
      res.send(itemDelete)
    } catch (error) {
      next(error)
    }
  }
