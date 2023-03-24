import "express-async-errors"
import { Response, Request } from "express"

// FIXME: stop using "id" as primary key

export const genrateItemCreate =
  (prismaTableController: any) => async (req: Request, res: Response) => {
    const data = req.body
    const newItem = await prismaTableController.create({ data })
    res.send(newItem)
  }

export const genrateItemsRead =
  (prismaTableController: any) => async (req: Request, res: Response) => {
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
  }

export const genrateItemRead =
  (prismaTableController: any) => async (req: Request, res: Response) => {
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
  }

export const genrateItemUpdate =
  (prismaTableController: any) => async (req: Request, res: Response) => {
    const data = req.body
    const { primaryKey } = req.params

    const query = { where: { id: Number(primaryKey) }, data }

    const itemUpdate = await prismaTableController.update(query)
    res.send(itemUpdate)
  }

export const genrateItemDelete =
  (prismaTableController: any) => async (req: Request, res: Response) => {
    const { primaryKey } = req.params
    const query = { where: { id: Number(primaryKey) } }
    const itemDelete = await prismaTableController.delete(query)
    res.send(itemDelete)
  }
