"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const randomFilm_1 = require("../controllers/randomFilm");
const router = (0, express_1.Router)();
router.get("/", randomFilm_1.RandomFilmController.Find);
exports.default = router;
