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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_1 = require("../models/user");
const helperFunctions_1 = require("../helperFunctions");
exports.UsersController = {
    Create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = new user_1.User(Object.assign({}, req.body));
            console.log(user);
            yield user.save();
            return res.status(201).json({ message: "OK" });
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    }),
    SaveFilm: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: "Authentication required" });
            }
            const userId = (0, helperFunctions_1.getUserIdFromToken)(token);
            const { film } = req.body;
            if (!film || !film.id || !film.title) {
                return res.status(400).json({ message: "Invalid film data" });
            }
            const user = yield (0, helperFunctions_1.findUserById)(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const filmData = Object.assign({}, film);
            user.films.push(filmData);
            yield user.save();
            return res.status(201).json({ user, message: "OK" });
        }
        catch (error) {
            console.error("Error saving film:", error);
            return res.status(500).json({ message: "Failed to save film" });
        }
    }),
};
