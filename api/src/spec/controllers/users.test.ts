import request from "supertest";
import { app } from "../../server";
import fetch from "jest-fetch-mock";

require("../mongodb_helper");
require("jest-fetch-mock").enableMocks();

import User, { IUser } from "../../models/user";

describe("RandomFilmController", () => {
  beforeEach(async () => {
    fetch.resetMocks();
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  it("gives response code 201", async () => {
    let response = await request(app).post("/users").send({
      username: "film-expert",
      email: "test@email.com",
      password: "password",
    });
    expect(response.status).toBe(201);
  });

  it("can create a user", async () => {
    await request(app).post("/users").send({
      username: "film-expert",
      email: "test@email.com",
      password: "password",
    });
    let users = await User.find();
    let newUser = users[users.length - 1];
    expect(newUser.email).toEqual("test@email.com");
  });
});
