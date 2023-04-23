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
exports.TokensController = void 0;
const tokenGenerator_1 = require("../models/tokenGenerator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
exports.TokensController = {
    Create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield user_1.default.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "auth error" });
        }
        if (user.password === password) {
            const token = yield (0, tokenGenerator_1.generateToken)(user.id);
            return res
                .status(201)
                .cookie("token", token, { httpOnly: true })
                .json({ message: "OK" });
        }
        else {
            return res.status(401).json({ message: "auth error" });
        }
    }),
    Clear: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.clearCookie("token");
        res.send({ success: true });
    }),
    Check: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            return res
                .status(201)
                .json({ message: "no user in session", session: false });
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (error, payload) => {
            if (error) {
                console.log(error);
                return res.status(401).json({ message: "auth error" });
            }
            else {
                return res
                    .status(201)
                    .json({ message: "user in session", session: true });
            }
        });
    }),
};
