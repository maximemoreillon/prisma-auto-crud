import request from "supertest"
import { app } from "../server"
import { expect, test } from "bun:test"

test("GET /", async () => {
  const { status } = await request(app).get("/")
  expect(status).toBe(200)
})
