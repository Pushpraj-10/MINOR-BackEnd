"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const professor_controller_1 = require("./professor.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = (0, express_1.Router)();
router.post("/professor-assignment", auth_middleware_1.authenticateToken, professor_controller_1.createProfessorAssignment);
router.put("/professor-assignment/:id", auth_middleware_1.authenticateToken, professor_controller_1.updateProfessorAssignment);
router.delete("/professor-assignment/:id", auth_middleware_1.authenticateToken, professor_controller_1.deleteProfessorAssignment);
router.post("/generateQR", auth_middleware_1.authenticateToken, professor_controller_1.generateSessionQR);
router.get("/course-offerings", auth_middleware_1.authenticateToken, professor_controller_1.getProfessorCourseOfferings);
exports.default = router;
//# sourceMappingURL=professor.router.js.map