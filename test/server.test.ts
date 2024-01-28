import { app } from "../server"
import { expect, test } from "bun:test"
import request from "supertest"

let id: string

test("GET /", async () => {
  const { status } = await request(app).get(`/`)
  expect(status).toBe(200)
})

test("GET /models", async () => {
  const { body } = await request(app).get(`/models`)
  expect(body[0]).toBe("user")
})

test("POST /user", async () => {
  const { status, body } = await request(app)
    .post(`/user`)
    .send({ name: "John" })

  id = body.id
  expect(status).toBe(200)
})

test("GET /user", async () => {
  const { body } = await request(app).get(`/user`)
  expect(body.items.length).toBe(1)
})

test("GET /user/:id", async () => {
  const { status } = await request(app).get(`/user/${id}`)
  expect(status).toBe(200)
})

test("PATCH /user/:id", async () => {
  const { status } = await request(app)
    .patch(`/user/${id}`)
    .send({ name: "Jack" })
  expect(status).toBe(200)
})

test("DELETE /user/:id", async () => {
  const { status } = await request(app).delete(`/user/${id}`)
  expect(status).toBe(200)
})
