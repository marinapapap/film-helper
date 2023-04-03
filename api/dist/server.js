"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const randomFilm_1 = __importDefault(require("./routes/randomFilm"));
(0, dotenv_1.config)({ path: "./config.env" });
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// mongoDB test
// import User, { IUser } from "./models/user";
// app.post("/user", async (req, res) => {
//   const newUser: IUser = await User.create({
//     email: req.body.email,
//     password: req.body.password,
//   });
//   res.status(200).json({ message: "OK", data: newUser });
// });
// app.get("/user", async (req, res) => {
//   const users: IUser[] = await User.find({});
//   res.status(200).json({ users: users });
// });
// routes
app.use("/randomFilm", randomFilm_1.default);
