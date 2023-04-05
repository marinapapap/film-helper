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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../server");
const jest_fetch_mock_1 = __importDefault(require("jest-fetch-mock"));
require("../mongodb_helper");
require("jest-fetch-mock").enableMocks();
const user_1 = __importDefault(require("../../models/user"));
describe("RandomFilmController", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        jest_fetch_mock_1.default.resetMocks();
        yield user_1.default.deleteMany({});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.deleteMany({});
    }));
    it("gives response code 201", () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(server_1.app).post("/users").send({
            username: "film-expert",
            email: "test@email.com",
            password: "password",
        });
        expect(response.status).toBe(201);
    }));
    it("can create a user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server_1.app).post("/users").send({
            username: "film-expert",
            email: "test@email.com",
            password: "password",
        });
        let users = yield user_1.default.find();
        let newUser = users[users.length - 1];
        expect(newUser.email).toEqual("test@email.com");
    }));
});
