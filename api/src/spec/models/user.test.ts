import mongoose from "mongoose";
import "../mongodb_helper";
import User, { IUser } from "../../models/user";

describe("User model", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("has an email address", async () => {
    const user = new User({
      username: "film-expert",
      email: "test@email.com",
      password: "password",
    });
    expect(user.email).toEqual("test@email.com");
  });

  it("has a password", async () => {
    const user = new User({
      username: "film-expert",
      email: "test@email.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("has a username", async () => {
    const user = new User({
      username: "film-expert",
      email: "test@email.com",
      password: "password",
    });
    expect(user.username).toEqual("film-expert");
  });

  it("can list all the users", async () => {
    try {
      const users = await User.find();
      expect(users).toEqual([]);
    } catch (error) {
      throw error;
    }
  });

  it("can save a user", async () => {
    const user = new User({
      username: "film-expert",
      email: "test@email.com",
      password: "password",
    });
    try {
      await user.save();
      const users: any = await User.find();

      expect(users.length).toBeGreaterThan(0);
      expect(users[0].username).toBe(user.username);
      expect(users[0].email).toBe(user.email);
      expect(users[0].password).toBe(user.password);
    } catch (error) {
      throw error;
    }
  });

  it("user cannot have the same email as someone else", async () => {
    const user1 = new User({
      username: "film-expert",
      email: "test@email.com",
      password: "password1",
    });
    await user1.save();

    const user2 = new User({
      username: "film-expert",
      email: "test@email.com",
      password: "password2",
    });
    try {
      await user2.save();
    } catch (error) {}

    const users = await User.find();
    expect(users.length).toEqual(1);
  });

  it("invalid email provided", async () => {
    const user1 = new User({
      username: "film-expert",
      email: "test@email.com",
      password: "password1",
    });
    await user1.save();

    const user2 = new User({
      username: "film-expert",
      email: "testemail2.com",
      password: "password2",
    });
    try {
      await user2.save();
    } catch (error) {}

    const users = await User.find();
    expect(users.length).toEqual(1);
  });
});
