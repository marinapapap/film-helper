"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: "./config.env" });
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use((0, express_session_1.default)({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));
const randomFilm_1 = __importDefault(require("./routes/randomFilm"));
const users_1 = __importDefault(require("./routes/users"));
// routes
exports.app.use("/randomFilm", randomFilm_1.default);
exports.app.use("/users", users_1.default);
// export { app };
