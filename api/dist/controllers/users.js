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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_1 = require("../models/user");
const bcrypt = __importStar(require("bcrypt"));
exports.UsersController = {
    Create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
            if (!regex.test(req.body.password)) {
                return res.status(400).json({
                    message: "Password must be at least 6 characters long and include at least one uppercase letter and one digit",
                });
            }
            const salt = yield bcrypt.genSalt(10);
            const hashedPassword = yield bcrypt.hash(req.body.password, salt);
            const lowercaseEmail = req.body.email.toLowerCase();
            const user = new user_1.User({
                username: req.body.username,
                password: hashedPassword,
                email: lowercaseEmail,
            });
            yield user.save();
            return res.status(201).json({ message: "OK" });
        }
        catch (error) {
            if (error.code == 11000) {
                return res
                    .status(400)
                    .json({ message: "That email address is already registered" });
            }
            else if (!!error.errors) {
                const errors = error.errors;
                for (const key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        return res.status(400).json({ message: errors[key].message });
                    }
                }
            }
            else {
                return res.status(400).json({ message: error });
            }
        }
    }),
};
