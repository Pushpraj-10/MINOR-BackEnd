"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAttendanceSchema = exports.DeleteStudentCourseRegistration = exports.UpdateStudentCourseRegistration = exports.CreateStudentCourseRegistration = void 0;
const zod_1 = require("zod");
// ========== CREATE REGISTRATION ==========
exports.CreateStudentCourseRegistration = zod_1.z.object({
    studentId: zod_1.z.string().uuid(),
    offeringId: zod_1.z.string().uuid(),
});
// ========== UPDATE REGISTRATION ==========
exports.UpdateStudentCourseRegistration = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    studentId: zod_1.z.string().uuid().optional(),
    offeringId: zod_1.z.string().uuid().optional(),
});
// ========== DELETE REGISTRATION ==========
exports.DeleteStudentCourseRegistration = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
// ========== ATTENDANCE ==========
exports.markAttendanceSchema = zod_1.z.object({
    token: zod_1.z.string().min(10, "Invalid token"),
});
//# sourceMappingURL=student.validation.js.map