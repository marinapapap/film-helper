"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const savedFilms_1 = require("../controllers/savedFilms");
const router = (0, express_1.Router)();
router.delete("/film", savedFilms_1.RandomFilmController.RemoveFilm);
exports.default = router;
