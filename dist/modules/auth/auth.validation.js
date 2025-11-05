"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.professorRegisterSchema = exports.studentRegisterSchema = void 0;
const zod_1 = require("zod");
exports.studentRegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    branch: zod_1.z.string().optional()
});
exports.professorRegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
//# sourceMappingURL=auth.validation.js.map