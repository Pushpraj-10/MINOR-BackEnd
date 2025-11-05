"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfessorCourseOfferings = exports.GenerateSessionQR = exports.DeleteProfessorAssignment = exports.UpdateProfessorAssignment = exports.CreateProfessorAssignment = void 0;
const zod_1 = require("zod");
// ====== CREATE PROFESSOR ASSIGNMENT ======
exports.CreateProfessorAssignment = zod_1.z.object({
    professorId: zod_1.z.string().uuid(),
    offeringId: zod_1.z.string().uuid(),
});
// ====== UPDATE PROFESSOR ASSIGNMENT ======
exports.UpdateProfessorAssignment = zod_1.z.object({
    id: zod_1.z.string().uuid(), // primary key for update
    professorId: zod_1.z.string().uuid().optional(),
    offeringId: zod_1.z.string().uuid().optional(),
});
// ====== DELETE PROFESSOR ASSIGNMENT ======
exports.DeleteProfessorAssignment = zod_1.z.object({
    id: zod_1.z.string().uuid(), // primary key for deletion
});
// ====== GENERATE SESSION QR-TOKEN ======
exports.GenerateSessionQR = zod_1.z.object({
    sessionId: zod_1.z.string().uuid(), // must be a valid session
    validFrom: zod_1.z.string().datetime().optional(), // default now if not provided
    validUntil: zod_1.z.string().datetime().optional(), // optional expiry
    maxUses: zod_1.z.number().int().min(0).default(0) // 0 = unlimited
});
// ====== GET PROFESSOR COURSE OFFERINGS ======
exports.GetProfessorCourseOfferings = zod_1.z.object({
    professorId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=professor.validation.js.map