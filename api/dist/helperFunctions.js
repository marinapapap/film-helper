"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.getUserIdFromToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("./models/user");
const getUserIdFromToken = (token) => {
    const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    return payload.user_id;
};
exports.getUserIdFromToken = getUserIdFromToken;
const findUserById = (userId) => {
    return user_1.User.findOne({ _id: userId });
};
exports.findUserById = findUserById;
