"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionDeletionSchema = exports.sessionUpdationSchema = exports.sessionCreationSchema = void 0;
const zod_1 = require("zod");
// ========== CREATE ==========
exports.sessionCreationSchema = zod_1.z.object({
    offeringId: zod_1.z.string().uuid(), // required
    professorId: zod_1.z.string().uuid(), // required
    sessionDate: zod_1.z.string().datetime(), // ISO date string
    topic: zod_1.z.string().optional(), // optional
});
// ========== UPDATE ==========
exports.sessionUpdationSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(), // which session to update
    offeringId: zod_1.z.string().uuid().optional(),
    professorId: zod_1.z.string().uuid().optional(),
    sessionDate: zod_1.z.string().datetime().optional(),
    topic: zod_1.z.string().optional(),
});
// ========== DELETE ==========
exports.sessionDeletionSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(), // delete by session ID
});
//# sourceMappingURL=sessions.validation.js.map