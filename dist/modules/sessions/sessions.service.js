"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class SessionService {
    // ========== CREATE SESSION ==========
    static async createSession(data) {
        // check for duplicate session (based on unique constraint)
        const existing = await prisma_1.default.classSession.findUnique({
            where: {
                offeringId_professorId_sessionDate: {
                    offeringId: data.offeringId,
                    professorId: data.professorId,
                    sessionDate: new Date(data.sessionDate),
                },
            },
        });
        if (existing) {
            throw new Error("Session already exists for this professor on this date");
        }
        const session = await prisma_1.default.classSession.create({
            data: {
                offeringId: data.offeringId,
                professorId: data.professorId,
                sessionDate: new Date(data.sessionDate),
                topic: data.topic,
            },
        });
        return session;
    }
    // ========== UPDATE SESSION ==========
    static async updateSession(data) {
        const existing = await prisma_1.default.classSession.findUnique({
            where: { id: data.id },
        });
        if (!existing) {
            throw new Error("Session not found");
        }
        const { id, ...updateData } = data;
        const updated = await prisma_1.default.classSession.update({
            where: { id },
            data: {
                ...updateData,
                sessionDate: updateData.sessionDate ? new Date(updateData.sessionDate) : undefined,
            },
        });
        return updated;
    }
    // ========== DELETE SESSION ==========
    static async deleteSession(data) {
        const existing = await prisma_1.default.classSession.findUnique({
            where: { id: data.id },
        });
        if (!existing) {
            throw new Error("Session not found");
        }
        await prisma_1.default.classSession.delete({
            where: { id: data.id },
        });
        return { message: "Session deleted successfully" };
    }
}
exports.SessionService = SessionService;
//# sourceMappingURL=sessions.service.js.map