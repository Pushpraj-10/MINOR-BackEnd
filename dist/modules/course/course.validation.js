"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCourse = exports.UpdateCourse = exports.CreateCourse = void 0;
const zod_1 = require("zod");
exports.CreateCourse = zod_1.z.object({
    code: zod_1.z.string().min(2),
    title: zod_1.z.string().min(2),
    description: zod_1.z.string().optional(),
    credits: zod_1.z.number().int().min(0).default(0)
});
exports.UpdateCourse = zod_1.z.object({
    code: zod_1.z.string().min(2).optional(),
    title: zod_1.z.string().min(2).optional(),
    description: zod_1.z.string().optional(),
    credits: zod_1.z.number().int().min(0).optional()
});
exports.DeleteCourse = zod_1.z.object({
    code: zod_1.z.string().min(2)
});
//# sourceMappingURL=course.validation.js.map