"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId) => {
    const secret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ user_id: userId, iat: Math.floor(Date.now() / 1000) }, secret);
    return token;
};
exports.generateToken = generateToken;
