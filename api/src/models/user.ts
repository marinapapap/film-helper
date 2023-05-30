import mongoose, { Schema, Model } from "mongoose";

export interface IFilm {
  id: string;
  rank: string;
  title: string;
  fullTitle: string;
  year: string;
  image: string;
  crew: string;
  imDbRating: string;
  imDbRatingCount: string;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  films: IFilm[];
}

const FilmSchema = new mongoose.Schema<IFilm>({
  id: { type: String },
  rank: { type: String },
  title: { type: String },
  fullTitle: { type: String },
  year: { type: String },
  image: { type: String },
  crew: { type: String },
  imDbRating: { type: String },
  imDbRatingCount: { type: String },
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
  films: [FilmSchema],
});

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
const Film: Model<IFilm> = mongoose.model<IFilm>("Film", FilmSchema);

export { User, Film };
