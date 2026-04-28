import { describe, test, beforeEach, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";
import { User } from "../src/models/user.js";

const firstUser = {
  name: "Eduardo Segredo",
  username: "esegredo",
  email: "esegredo@example.com",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(firstUser).save();
});

describe("POST /users", () => {
    test("Should successfully create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Alejandro García",
        username: "agarcia",
        email: "agarcia@example.com",
      })
      .expect(201);

    expect(response.body).to.include({
      name: "Alejandro García",
      username: "agarcia",
      email: "agarcia@example.com",
    });

    const secondUser = await User.findById(response.body._id);
    expect(secondUser).not.toBe(null);
    expect(secondUser!.username).to.equal("agarcia");
  });

  test("Should get an error", async () => {
    await request(app).post("/users").send(firstUser).expect(500);
  });
});

describe("GET /users", () => {
  test("Should get a user by username", async () => {
    await request(app).get("/users?username=esegredo").expect(200);
  });

  test("Should not find a user by username", async () => {
    await request(app).get("/users?username=edusegre").expect(404);
  });
});
