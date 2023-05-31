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
exports.RandomFilmController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
exports.RandomFilmController = {
    Find: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let top250Films = { items: [] };
        try {
            let response = yield fetch(`https://imdb-api.com/en/API/Top250Movies/${process.env.TOP_250}`);
            top250Films = yield response.json();
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to fetch top 250 films" });
        }
        // get random film from top 250
        const random = Math.floor(Math.random() * top250Films.items.length);
        const filmToCheck = top250Films.items[random];
        // get user_id
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = payload.user_id;
        // Find the user and save the film
        const user = yield user_1.User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // search for saved film
        let saved = false;
        user.films.forEach((film) => {
            film.id == filmToCheck.id ? (saved = true) : saved;
        });
        return res
            .status(200)
            .json({ result: top250Films.items[random], saved: saved });
    }),
};
