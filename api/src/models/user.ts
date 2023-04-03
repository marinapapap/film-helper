import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
  email: {
    type: StringConstructor;
    required: Boolean;
    unique: Boolean;
    dropDups: Boolean;
    match: RegExp;
  };
  password: {
    type: StringConstructor;
    required: Boolean;
  };
}

const UserSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: { type: String, required: true },
});

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
