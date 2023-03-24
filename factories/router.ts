import { Router } from "express"
import {
  genrateItemCreate,
  genrateItemsRead,
  genrateItemRead,
  genrateItemUpdate,
  genrateItemDelete,
} from "./crud"

export const generateTableRouter = (prismaTableController: any) => {
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
