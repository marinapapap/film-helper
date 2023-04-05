"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokens_1 = require("../controllers/tokens");
const router = (0, express_1.Router)();
router.get("/", tokens_1.TokensController.Create);
exports.default = router;
