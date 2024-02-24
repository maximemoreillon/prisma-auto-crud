import { Router } from "express"
import {
  genrateItemCreate,
  genrateItemsRead,
  genrateItemRead,
  genrateItemUpdate,
  genrateItemDelete,
} from "./crud"

const { READ_ONLY } = process.env

export const generateTableRouter = (prismaTableController: any) => {
  const router = Router()

  router.route("/").get(genrateItemsRead(prismaTableController))

  router.route("/:primaryKey").get(genrateItemRead(prismaTableController))

  if (!READ_ONLY) {
    router.route("/").post(genrateItemCreate(prismaTableController))
    router
      .route("/:primaryKey")
      .patch(genrateItemUpdate(prismaTableController))
      .delete(genrateItemDelete(prismaTableController))
  } else {
    console.log(`Running in read-only mode`)
  }

  return router
}
