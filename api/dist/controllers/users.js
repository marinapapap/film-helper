"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.UsersController = {
    Create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = new user_1.User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        try {
            yield user.save();
            return res.status(201).json({ message: "OK" });
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    }),
    SaveFilm: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // get user_id
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: "Authentication required" });
            }
            const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const userId = payload.user_id;
            // Validate the film data
            const { film } = req.body;
            console.log(film);
            if (!film || !film.id || !film.title) {
                return res.status(400).json({ message: "Invalid film data" });
            }
            // Find the user and save the film
            const user = yield user_1.User.findOne({ _id: userId });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const filmData = Object.assign({}, film);
            user.films.push(filmData);
            yield user.save();
            console.log(user);
            return res.status(201).json({ user });
        }
        catch (error) {
            // Handle the error
            console.error("Error saving film:", error);
            return res.status(500).json({ message: "Failed to save film" });
        }
    }),
};
