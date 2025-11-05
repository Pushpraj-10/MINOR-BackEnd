"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./modules/auth/auth.router"));
const course_router_1 = __importDefault(require("./modules/course/course.router"));
const batch_router_1 = __importDefault(require("./modules/batch/batch.router"));
const courseOffer_router_1 = __importDefault(require("./modules/courseOffering/courseOffer.router"));
const professor_router_1 = __importDefault(require("./modules/professor/professor.router"));
const sessions_router_1 = __importDefault(require("./modules/sessions/sessions.router"));
const student_router_1 = __importDefault(require("./modules/student/student.router"));
const router = (0, express_1.Router)();
// ========= AUTHENTICATION =========
router.use('/auth', auth_router_1.default);
// ========= COURSE =========
router.use('/course', course_router_1.default);
// ========= BATCH =========
router.use('/batchapi', batch_router_1.default);
// ========= COURSE OFFERING =========
router.use('/courseOfferApi', courseOffer_router_1.default);
// ========= PROFESSOR =========
router.use('/professorapi', professor_router_1.default);
// ========= STUDENTS =========
router.use('/studentapi', student_router_1.default);
// ========= SESSION =========
router.use('/sessionapi', sessions_router_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map