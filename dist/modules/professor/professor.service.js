"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorService = void 0;
const crypto_1 = require("crypto");
const prisma_1 = __importDefault(require("../../config/prisma"));
class ProfessorService {
    // ========== CREATE ==========
    static async createProfessorAssignment(data) {
        // check if the professor is already assigned to the offering
        const existing = await prisma_1.default.professorAssignment.findUnique({
            where: {
                professorId_offeringId: {
                    professorId: data.professorId,
                    offeringId: data.offeringId,
                },
            },
        });
        if (existing) {
            throw new Error("Professor is already assigned to this offering");
        }
        const assignment = await prisma_1.default.professorAssignment.create({
            data: {
                professorId: data.professorId,
                offeringId: data.offeringId,
            },
        });
        return assignment;
    }
    // ========== UPDATE ==========
    static async updateProfessorAssignment(id, data) {
        const existing = await prisma_1.default.professorAssignment.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new Error("Professor assignment not found");
        }
        const updated = await prisma_1.default.professorAssignment.update({
            where: { id },
            data,
        });
        return updated;
    }
    // ========== DELETE ==========
    static async deleteProfessorAssignment(id) {
        const existing = await prisma_1.default.professorAssignment.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new Error("Professor assignment not found");
        }
        await prisma_1.default.professorAssignment.delete({
            where: { id },
        });
        return { message: "Professor assignment deleted successfully" };
    }
    // ====== GENERATE SESSION QR-TOKEN ======
    static async generateToken(data) {
        // Ensure session exists
        const session = await prisma_1.default.classSession.findUnique({
            where: { id: data.sessionId },
        });
        if (!session) {
            throw new Error("Session not found");
        }
        // Generate a unique token string
        const token = (0, crypto_1.randomUUID)();
        // Save to DB
        const qrToken = await prisma_1.default.qRToken.create({
            data: {
                sessionId: data.sessionId,
                token,
                validFrom: data.validFrom ? new Date(data.validFrom) : new Date(),
                validUntil: data.validUntil ? new Date(data.validUntil) : null,
                maxUses: data.maxUses ?? 0,
            },
        });
        return qrToken;
    }
    // ====== FETCHING COURSES ======
    static async getProfessorCourseOfferings(data) {
        const { professorId } = data;
        const assignments = await prisma_1.default.professorAssignment.findMany({
            where: { professorId },
            include: {
                offering: {
                    include: {
                        course: true, // course details (Course table)
                        batch: true, // batch details
                    },
                },
            },
        });
        // Transform into a clean DTO
        const offerings = assignments.map((assignment) => ({
            offeringId: assignment.offering.id,
            semester: assignment.offering.semester,
            createdAt: assignment.offering.createdAt,
            course: assignment.offering.course,
            batch: assignment.offering.batch,
        }));
        return offerings;
    }
}
exports.ProfessorService = ProfessorService;
//# sourceMappingURL=professor.service.js.map