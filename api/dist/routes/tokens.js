"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokens_1 = require("../controllers/tokens");
const router = (0, express_1.Router)();
router.post("/login", tokens_1.TokensController.Create);
router.get("/logout", tokens_1.TokensController.Clear);
router.get("/validate", tokens_1.TokensController.Check);
exports.default = router;
