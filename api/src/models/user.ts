import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  } as any,
  password: { type: String, required: true } as any,
});

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
