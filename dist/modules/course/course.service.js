"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class CourseService {
    static async createCourse(data) {
        const existing = await prisma_1.default.course.findUnique({
            where: { code: data.code },
        });
        if (existing) {
            throw new Error("Course code already exists");
        }
        const course = await prisma_1.default.course.create({
            data: {
                code: data.code,
                title: data.title,
                description: data.description,
                credits: data.credits ?? 0,
            },
        });
        return course;
    }
    // ========== UPDATE COURSE ==========
    static async updateCourse(code, data) {
        const existing = await prisma_1.default.course.findUnique({
            where: { code },
        });
        if (!existing) {
            throw new Error("Course not found");
        }
        const updated = await prisma_1.default.course.update({
            where: { code },
            data, // only fields to update
        });
        return updated;
    }
    // ========== DELETE COURSE ==========
    static async deleteCourse(code) {
        const existing = await prisma_1.default.course.findUnique({
            where: { code },
        });
        if (!existing) {
            throw new Error("Course not found");
        }
        await prisma_1.default.course.delete({
            where: { code },
        });
        return { message: "Course deleted successfully" };
    }
}
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map