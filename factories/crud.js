require("express-async-errors")

// FIXME: stop using "id" as primary key

exports.genrateItemCreate = (prismaTableController) => async (req, res) => {
  const data = req.body
  const newItem = await prismaTableController.create({ data })
  res.send(newItem)
}

exports.genrateItemsRead = (prismaTableController) => async (req, res) => {
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

exports.genrateItemRead = (prismaTableController) => async (req, res) => {
  const { primaryKey } = req.params
  let { includes = [] } = req.query

  if (typeof includes === "string") includes = [includes]

  const query = { where: { id: Number(primaryKey) } }
  if (includes.length)
    query.include = includes.reduce((prev, i) => ({ ...prev, [i]: true }), {})

  const item = await prismaTableController.findUnique(query)
  res.send(item)
}

exports.genrateItemUpdate = (prismaTableController) => async (req, res) => {
  const data = req.body
  const { primaryKey } = req.params

  const query = { where: { id: Number(primaryKey) }, data }

  const itemUpdate = await prismaTableController.update(query)
  res.send(itemUpdate)
}

exports.genrateItemDelete = (prismaTableController) => async (req, res) => {
  const { primaryKey } = req.params
  const query = { where: { id: Number(primaryKey) } }
  const itemDelete = await prismaTableController.delete(query)
  res.send(itemDelete)
}
