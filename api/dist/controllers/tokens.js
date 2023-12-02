"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const user_1 = require("../models/user");
const bcrypt = __importStar(require("bcrypt"));
exports.TokensController = {
    Create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const lowercaseEmail = req.body.email.toLowerCase();
        const password = req.body.password;
        const user = yield user_1.User.findOne({ email: lowercaseEmail });
        if (!user) {
            return res.status(401).json({ message: "auth error" });
        }
        const passwordMatch = yield bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = yield (0, tokenGenerator_1.generateToken)(user.id);
            return res
                .status(201)
                .cookie("token", token, {
                httpOnly: true,
                sameSite: "lax",
                secure: true,
                domain: "film-roulette-one.vercel.app",
            })
                .json({ message: "OK" });
        }
        else {
            return res.status(401).json({ message: "auth error" });
        }
    }),
    Clear: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            domain: "film-roulette-one.vercel.app",
        });
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
