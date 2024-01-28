import request from "supertest"
import { expect } from "chai"
import { app } from "../server"

describe("/users", () => {
  describe("GET /", () => {
    it("Should provide app information", async () => {
      const { status } = await request(app).get("/")

      expect(status).to.equal(200)
    })
  })

  describe("GET /models", () => {
    // What should it do
    it("Should provide a list of models", async () => {
      const { status } = await request(app).get("/models")

      expect(status).to.equal(200)
    })
  })
})
