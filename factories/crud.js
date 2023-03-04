require("express-async-errors")

exports.genrateItemCreate = (prismaTableController) => {
  return async (req, res) => {
    const data = req.body
    const newItem = await prismaTableController.create({ data })
    res.send(newItem)
  }
}

exports.genrateItemsRead = (prismaTableController) => {
  return async (req, res) => {
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
      orderBy: [{ [sort]: order }],
      where: { ...rest },
    }

    const items = await prismaTableController.findMany(query)

    const total = await prismaTableController.count({ where: { ...rest } })

    res.send({ skip, take, total, items })
  }
}

exports.genrateItemRead = (prismaTableController) => {
  return async (req, res) => {
    const { id } = req.params

    let { includes = [] } = req.query
    if (typeof includes === "string") includes = [includes]

    const query = { where: { id: Number(id) } }
    if (includes.length)
      query.include = includes.reduce((prev, i) => ({ ...prev, [i]: true }), {})

    const item = await prismaTableController.findUnique(query)
    res.send(item)
  }
}

exports.genrateItemUpdate = (prismaTableController) => {
  return async (req, res) => {
    const data = req.body
    const { id } = req.params

    const query = { where: { id: Number(id) }, data }

    const itemUpdate = await prismaTableController.update(query)
    res.send(itemUpdate)
  }
}

exports.genrateItemDelete = (prismaTableController) => {
  return async (req, res) => {
    const { id } = req.params
    const query = { where: { id: Number(id) } }
    const itemDelete = await prismaTableController.delete(query)
    res.send(itemDelete)
  }
}
