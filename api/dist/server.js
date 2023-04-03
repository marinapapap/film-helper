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
const user_1 = __importDefault(require("./models/user"));
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user_1.default.create({
        email: req.body.email,
        password: req.body.password,
    });
    res.status(200).json({ message: "OK", data: newUser });
}));
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({});
    res.status(200).json({ users: users });
}));
// routes
app.use("/randomFilm", randomFilm_1.default);
