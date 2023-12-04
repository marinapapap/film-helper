"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Film = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FilmSchema = new mongoose_1.default.Schema({
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
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    films: [FilmSchema],
});
const User = mongoose_1.default.model("User", UserSchema);
exports.User = User;
const Film = mongoose_1.default.model("Film", FilmSchema);
exports.Film = Film;
