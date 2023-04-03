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
});
