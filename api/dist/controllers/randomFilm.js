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
const RandomFilmController = {
    Find: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let top250Films = { items: [] };
        try {
            let response = yield fetch(`https://imdb-api.com/en/API/Top250Movies/${process.env.TOP_250}`);
            top250Films = yield response.json();
        }
        catch (error) {
            console.log(error);
            return res.json(500).json({ message: error });
        }
        const random = Math.floor(Math.random() * top250Films.items.length);
        res.status(200).json({ results: top250Films.items[random] });
    }),
};
exports.default = RandomFilmController;
