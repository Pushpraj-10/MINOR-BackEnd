"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("./course.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = (0, express_1.Router)();
// ========== Create COURSE ==========
router.post("/course", auth_middleware_1.authenticateToken, course_controller_1.createCourse);
// ========== UPDATE COURSE ==========
router.patch("/course/:code", auth_middleware_1.authenticateToken, course_controller_1.updateCourse);
// ========== DELETE COURSE ==========
router.delete("/course/:code", auth_middleware_1.authenticateToken, course_controller_1.deleteCourse);
exports.default = router;
//# sourceMappingURL=course.router.js.map