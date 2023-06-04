import request from "supertest";
import { app } from "../../server";
import fetch from "jest-fetch-mock";

require("../mongodb_helper");
require("jest-fetch-mock").enableMocks();

import { User } from "../../models/user";

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

  describe("when password NOT provided", () => {
    it("gives response code 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({ username: "film-expert", email: "test@email.com" });
      expect(response.status).toBe(400);
    });

    it("does not NOT create a user", async () => {
      await request(app)
        .post("/users")
        .send({ username: "film-expert", email: "test@email.com" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("when email NOT provided", () => {
    it("gives response code 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({ username: "film-expert", password: "password" });
      expect(response.status).toBe(400);
    });

    it("does not NOT create a user", async () => {
      await request(app)
        .post("/users")
        .send({ username: "film-expert", password: "password" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("when email is invalid", () => {
    it("gives response code 400", async () => {
      let response = await request(app).post("/users").send({
        username: "film-expert",
        email: "testemail.com",
        password: "password",
      });
      expect(response.status).toBe(400);
    });

    it("does not NOT create a user", async () => {
      await request(app).post("/users").send({
        username: "film-expert",
        email: "testemail.com",
        password: "password",
      });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("email has already been used", () => {
    beforeEach(async () => {
      await User.create({
        username: "film-expert",
        email: "test@email.com",
        password: "password1",
      });
    });

    it("gives response code 400", async () => {
      let response = await request(app).post("/users").send({
        username: "film-expert",
        email: "test@email.com",
        password: "password2",
      });
      expect(response.status).toBe(400);
    });

    it("does not NOT create a user", async () => {
      await request(app).post("/users").send({
        username: "film-expert",
        email: "test@email.com",
        password: "password2",
      });
      let users = await User.find();
      expect(users.length).toEqual(1);
    });
  });
});
