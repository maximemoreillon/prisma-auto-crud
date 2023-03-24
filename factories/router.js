const { Router } = require("express")
const {
  genrateItemCreate,
  genrateItemsRead,
  genrateItemRead,
  genrateItemUpdate,
  genrateItemDelete,
} = require("./crud.js")

exports.generateTableRouter = (prismaTableController) => {
  const router = Router()

  router
    .route("/")
    .post(genrateItemCreate(prismaTableController))
    .get(genrateItemsRead(prismaTableController))

  router
    .route("/:primaryKey")
    .get(genrateItemRead(prismaTableController))
    .put(genrateItemUpdate(prismaTableController))
    .delete(genrateItemDelete(prismaTableController))

  return router
}
