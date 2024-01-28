import { app } from "../server"
import { expect, test } from "bun:test"
import request from "supertest"

test("GET /", async () => {
  const response = await request(app).get(`/`)
  console.log(response)
  expect(response.status).toBe(200)
})
