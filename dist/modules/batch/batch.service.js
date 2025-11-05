"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class BatchService {
    // ========== CREATE ==========
    static async createBatch(data) {
        // check if batch with same name already exists
        const existing = await prisma_1.default.batch.findUnique({
            where: { name: data.name },
        });
        if (existing) {
            throw new Error("Batch name already exists");
        }
        const batch = await prisma_1.default.batch.create({
            data: {
                name: data.name,
                year: data.year,
                branch: data.branch,
            },
        });
        return batch;
    }
    // ========== UPDATE ==========
    static async updateBatch(id, data) {
        const existing = await prisma_1.default.batch.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new Error("Batch not found");
        }
        const updated = await prisma_1.default.batch.update({
            where: { id },
            data,
        });
        return updated;
    }
    // ========== DELETE ==========
    static async deleteBatch(id) {
        const existing = await prisma_1.default.batch.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new Error("Batch not found");
        }
        await prisma_1.default.batch.delete({
            where: { id },
        });
        return { message: "Batch deleted successfully" };
    }
}
exports.BatchService = BatchService;
//# sourceMappingURL=batch.service.js.map