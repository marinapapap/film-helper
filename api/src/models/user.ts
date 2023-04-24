import mongoose, { Schema, Model } from "mongoose";

export interface IFilm {
  filmId: string;
  filmTitle: string;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  films: IFilm[];
}

const filmSchema = new mongoose.Schema<IFilm>({
  filmId: { type: String, required: true },
  filmTitle: { type: String, required: true },
});

const UserSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  username: { type: String, required: true } as any,
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  } as any,
  password: { type: String, required: true } as any,
  films: [filmSchema],
});

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
