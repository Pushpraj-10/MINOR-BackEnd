"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/register/student", auth_controller_1.registerStudent);
router.post("/register/professor", auth_controller_1.registerProfessor);
router.post("/login", auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.router.js.map