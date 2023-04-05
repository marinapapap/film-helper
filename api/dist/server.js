"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const tokens_1 = require("./controllers/tokens");
(0, dotenv_1.config)({ path: "./config.env" });
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({ credentials: true, origin: process.env.FRONT_END_URL }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
const randomFilm_1 = __importDefault(require("./routes/randomFilm"));
const users_1 = __importDefault(require("./routes/users"));
const tokens_2 = __importDefault(require("./routes/tokens"));
// routes
exports.app.use("/randomFilm", tokens_1.TokensController.Check, randomFilm_1.default);
exports.app.use("/users", users_1.default);
exports.app.use("/tokens", tokens_2.default);
