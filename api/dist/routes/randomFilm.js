"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const randomFilm_1 = __importDefault(require("../controllers/randomFilm"));
const router = (0, express_1.Router)();
router.get("/", randomFilm_1.default.Find);
exports.default = router;
