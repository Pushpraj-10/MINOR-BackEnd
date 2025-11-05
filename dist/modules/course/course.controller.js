"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = createCourse;
exports.updateCourse = updateCourse;
exports.deleteCourse = deleteCourse;
const course_validation_1 = require("./course.validation");
const course_service_1 = require("./course.service");
async function createCourse(req, res) {
    try {
        const parsed = course_validation_1.CreateCourse.parse(req.body);
        const course = await course_service_1.CourseService.createCourse(parsed);
        res.status(201).json(course);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function updateCourse(req, res) {
    try {
        const code = req.params.code; // get course code from URL
        const parsed = course_validation_1.UpdateCourse.parse(req.body);
        // Exclude code from parsed data if present
        const { code: _, ...updateData } = parsed;
        const updatedCourse = await course_service_1.CourseService.updateCourse(code, updateData);
        res.json(updatedCourse);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function deleteCourse(req, res) {
    try {
        const code = req.params.code; // get course code from URL
        const result = await course_service_1.CourseService.deleteCourse(code);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//# sourceMappingURL=course.controller.js.map