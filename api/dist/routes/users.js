"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    console.log(`Received ${req.method} request to URL: ${req.url}`);
    next();
});
router.post("/", users_1.UsersController.Create);
exports.default = router;
