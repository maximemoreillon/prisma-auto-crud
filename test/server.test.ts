import { app } from "../server"
import { expect, test } from "bun:test"
import request from "supertest"

test("GET /", async () => {
  const { status } = await request(app).get(`/`)
  expect(status).toBe(200)
})

test("GET /models", async () => {
  const { body } = await request(app).get(`/models`)
  expect(body[0]).toBe("user")
})
