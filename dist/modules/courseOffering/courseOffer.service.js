"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseOfferingService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class CourseOfferingService {
    // ========== CREATE COURSE OFFERING ==========
    static async createCourseOffering(data) {
        // check if a course offering already exists for same course, batch, and semester
        const existing = await prisma_1.default.courseOffering.findUnique({
            where: {
                courseId_batchId_semester: {
                    courseId: data.courseId,
                    batchId: data.batchId,
                    semester: data.semester,
                },
            },
        });
        if (existing) {
            throw new Error("Course offering already exists for this course, batch, and semester");
        }
        const offering = await prisma_1.default.courseOffering.create({
            data: {
                courseId: data.courseId,
                batchId: data.batchId,
                semester: data.semester,
            },
        });
        return offering;
    }
    // ========== UPDATE COURSE OFFERING ==========
    static async updateCourseOffering(id, data) {
        const existing = await prisma_1.default.courseOffering.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new Error("Course offering not found");
        }
        const updated = await prisma_1.default.courseOffering.update({
            where: { id },
            data,
        });
        return updated;
    }
    // ========== DELETE COURSE OFFERING ==========
    static async deleteCourseOffering(id) {
        const existing = await prisma_1.default.courseOffering.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new Error("Course offering not found");
        }
        await prisma_1.default.courseOffering.delete({
            where: { id },
        });
        return { message: "Course offering deleted successfully" };
    }
}
exports.CourseOfferingService = CourseOfferingService;
//# sourceMappingURL=courseOffer.service.js.map