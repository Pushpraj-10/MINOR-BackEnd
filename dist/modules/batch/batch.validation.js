"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBatch = exports.UpdateBatch = exports.CreateBatch = void 0;
const zod_1 = require("zod");
// ========== CREATE ==========
exports.CreateBatch = zod_1.z.object({
    name: zod_1.z.string().min(2),
    year: zod_1.z.number().int().min(1900).max(2100), // adjust range as needed
    branch: zod_1.z.string().min(2),
});
// ========== UPDATE ==========
exports.UpdateBatch = zod_1.z.object({
    id: zod_1.z.string().uuid(), // required to identify which batch to update
    name: zod_1.z.string().min(2).optional(),
    year: zod_1.z.number().int().min(1900).max(2100).optional(),
    branch: zod_1.z.string().min(2).optional(),
});
// ========== DELETE ==========
exports.DeleteBatch = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
//# sourceMappingURL=batch.validation.js.map