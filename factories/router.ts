import { Router } from "express"
import {
  generateItemCreate,
  generateItemsRead,
  generateItemRead,
  generateItemUpdate,
  generateItemDelete,
} from "./crud"

const { READ_ONLY } = process.env

export const generateTableRouter = (prismaTableController: any) => {
  const router = Router()

  router.route("/").get(generateItemsRead(prismaTableController))

  router.route("/:primaryKey").get(generateItemRead(prismaTableController))

  if (!READ_ONLY) {
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
