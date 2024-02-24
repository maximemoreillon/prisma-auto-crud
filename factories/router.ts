import { Router } from "express"
import {
  generateItemCreate,
  generateItemsRead,
  generateItemRead,
  generateItemUpdate,
  generateItemDelete,
} from "./crud"

export const generateTableRouter = (
  prismaTableController: any,
  options: any
) => {
  const router = Router()

  router.route("/").get(generateItemsRead(prismaTableController))

  router.route("/:primaryKey").get(generateItemRead(prismaTableController))

  if (!options.readonly) {
    router.route("/").post(generateItemCreate(prismaTableController))
    router
      .route("/:primaryKey")
      .patch(generateItemUpdate(prismaTableController))
      .delete(generateItemDelete(prismaTableController))
  } else {
    console.log(`Running in read-only mode`)
  }

  return router
}
