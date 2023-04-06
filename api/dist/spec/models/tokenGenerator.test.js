"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenGenerator_1 = require("../../models/tokenGenerator");
describe("TokenController", () => {
    describe("jsonwebtoken", () => {
        test("returns a token containing user_id", () => {
            const user_id = 1;
            const token = (0, tokenGenerator_1.generateToken)(user_id);
            const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            expect(payload.user_id).toEqual(user_id);
        });
    });
});
