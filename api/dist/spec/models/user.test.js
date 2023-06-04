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
Object.defineProperty(exports, "__esModule", { value: true });
require("../mongodb_helper");
const user_1 = require("../../models/user");
describe("User model", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.User.deleteMany({});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.User.deleteMany({});
    }));
    it("has an email address", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new user_1.User({
            username: "film-expert",
            email: "test@email.com",
            password: "password",
        });
        expect(user.email).toEqual("test@email.com");
    }));
    it("has a password", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new user_1.User({
            username: "film-expert",
            email: "test@email.com",
            password: "password",
        });
        expect(user.password).toEqual("password");
    }));
    it("has a username", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new user_1.User({
            username: "film-expert",
            email: "test@email.com",
            password: "password",
        });
        expect(user.username).toEqual("film-expert");
    }));
    it("can list all the users", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield user_1.User.find();
            expect(users).toEqual([]);
        }
        catch (error) {
            throw error;
        }
    }));
    it("can save a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new user_1.User({
            username: "film-expert",
            email: "test@email.com",
            password: "password",
        });
        try {
            yield user.save();
            const users = yield user_1.User.find();
            expect(users.length).toBeGreaterThan(0);
            expect(users[0].username).toBe(user.username);
            expect(users[0].email).toBe(user.email);
            expect(users[0].password).toBe(user.password);
        }
        catch (error) {
            throw error;
        }
    }));
    it("user cannot have the same email as someone else", () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = new user_1.User({
            username: "film-expert",
            email: "test@email.com",
            password: "password1",
        });
        yield user1.save();
        const user2 = new user_1.User({
            username: "film-expert",
            email: "test@email.com",
            password: "password2",
        });
        try {
            yield user2.save();
        }
        catch (error) { }
        const users = yield user_1.User.find();
        expect(users.length).toEqual(1);
    }));
    it("invalid email provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = new user_1.User({
            username: "film-expert",
            email: "test@email.com",
            password: "password1",
        });
        yield user1.save();
        const user2 = new user_1.User({
            username: "film-expert",
            email: "testemail2.com",
            password: "password2",
        });
        try {
            yield user2.save();
        }
        catch (error) { }
        const users = yield user_1.User.find();
        expect(users.length).toEqual(1);
    }));
});
