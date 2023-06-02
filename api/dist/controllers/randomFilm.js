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
exports.RandomFilmController = void 0;
const helperFunctions_1 = require("../helperFunctions");
exports.RandomFilmController = {
    Find: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const top250Films = yield fetchTop250Films();
            const randomFilm = getRandomFilm(top250Films.items);
            const token = req.cookies.token;
            if (!token) {
                return res.status(200).json({ result: randomFilm });
            }
            const userId = (0, helperFunctions_1.getUserIdFromToken)(token);
            const user = yield (0, helperFunctions_1.findUserById)(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const saved = searchForSavedFilm(user.films, randomFilm.id);
            return res.status(200).json({ result: randomFilm, saved });
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to fetch random film" });
        }
    }),
};
const fetchTop250Films = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://imdb-api.com/en/API/Top250Movies/${process.env.TOP_250}`);
    return response.json();
});
const getRandomFilm = (films) => {
    const random = Math.floor(Math.random() * films.length);
    return films[random];
};
const searchForSavedFilm = (films, filmId) => {
    return films.some((film) => film.id === filmId);
};
