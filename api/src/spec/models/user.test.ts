import mongoose from "mongoose";
import "../mongodb_helper";
import User, { IUser } from "../../models/user";

describe("User model", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("has an email address", () => {
    const user: IUser = new User({
      email: "test@email.com",
      password: "password",
    });
    expect(user.email).toEqual("test@email.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "test@email.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
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
      email: "test@email.com",
      password: "password",
    });
    try {
      await user.save();
      const users: any = await User.find();

      expect(users.length).toBeGreaterThan(0);
      expect(users[0].email).toBe(user.email);
      expect(users[0].password).toBe(user.password);
    } catch (error) {
      throw error;
    }
  });
});
