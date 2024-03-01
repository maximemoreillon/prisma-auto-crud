import { app } from "../server"
import request from "supertest"
import { expect } from "chai"

let id: string

describe("/models", async () => {
  describe("GET /", async () => {
    it("Should not allow the query of available models", async () => {
      const { status, body } = await request(app).get(`/models`)
      expect(status).to.equal(200)
      expect(body[0]).to.equal("user")
    })
  })
})

describe("/user", async () => {
  describe("POST /user", async () => {
    it("Should not allow the create a user", async () => {
      const { status, body } = await request(app)
        .post(`/user`)
        .send({ name: "John" })

      id = body.id
      expect(status).to.equal(200)
    })
  })

  describe("GET /user", async () => {
    it("Should not allow the query users", async () => {
      const { status, body } = await request(app).get(`/user`)
      expect(status).to.equal(200)

      expect(body.items.length).to.above(1)
    })
  })

  describe("GET /user/:id", async () => {
    it("Should not allow the query users", async () => {
      const { status, body } = await request(app).get(`/user/${id}`)
      expect(status).to.equal(200)
      expect(body.name).to.equal("John")
    })
  })

  describe("PATCH /user/:id", async () => {
    it("Should not allow the update of a user", async () => {
      const { status } = await request(app)
        .patch(`/user/${id}`)
        .send({ name: "Jack" })

      expect(status).to.equal(200)
    })
  })

  describe("DELETE /user/:id", async () => {
    it("Should not allow the deletion of a user", async () => {
      const { status } = await request(app).delete(`/user/${id}`)
      expect(status).to.equal(200)
    })
  })
})
