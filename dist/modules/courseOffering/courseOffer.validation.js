"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCourseOffering = exports.UpdateCourseOffering = exports.CreateCourseOffering = void 0;
const zod_1 = require("zod");
// ========== CREATE COURSE OFFERING ==========
exports.CreateCourseOffering = zod_1.z.object({
    courseId: zod_1.z.string().uuid(),
    batchId: zod_1.z.string().uuid(),
    semester: zod_1.z.string(),
});
// ========== UPDATE COURSE OFFERING ==========
exports.UpdateCourseOffering = zod_1.z.object({
    id: zod_1.z.string().uuid(), // required to identify which offering to update
    courseId: zod_1.z.string().uuid().optional(),
    batchId: zod_1.z.string().uuid().optional(),
    semester: zod_1.z.string().optional(),
});
// ========== DELETE COURSE OFFERING ==========
exports.DeleteCourseOffering = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
//# sourceMappingURL=courseOffer.validation.js.map