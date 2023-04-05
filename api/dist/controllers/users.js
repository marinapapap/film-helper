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
exports.UsersController = void 0;
const user_1 = __importDefault(require("../models/user"));
exports.UsersController = {
    Create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = new user_1.default({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        try {
            yield user.save();
            return res.status(201).json({ message: "OK" });
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    }),
};
