"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessions_controller_1 = require("./sessions.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = (0, express_1.Router)();
// ========== Create COURSE ==========
router.post("/session", auth_middleware_1.authenticateToken, sessions_controller_1.createSession);
// ========== UPDATE COURSE ==========
router.patch("/session/:code", auth_middleware_1.authenticateToken, sessions_controller_1.updateSession);
// ========== DELETE COURSE ==========
router.delete("/session/:code", auth_middleware_1.authenticateToken, sessions_controller_1.deleteSession);
exports.default = router;
//# sourceMappingURL=sessions.router.js.map