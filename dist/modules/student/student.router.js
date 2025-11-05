"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("./student.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = (0, express_1.Router)();
router.post("/registration", auth_middleware_1.authenticateToken, student_controller_1.createRegistration);
router.put("/registration/:id", auth_middleware_1.authenticateToken, student_controller_1.updateRegistration);
router.delete("/registration/:id", auth_middleware_1.authenticateToken, student_controller_1.deleteRegistration);
router.post("/attendance/mark", auth_middleware_1.authenticateToken, student_controller_1.markAttendance);
exports.default = router;
//# sourceMappingURL=student.router.js.map