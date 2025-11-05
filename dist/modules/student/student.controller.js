"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegistration = createRegistration;
exports.updateRegistration = updateRegistration;
exports.deleteRegistration = deleteRegistration;
exports.markAttendance = markAttendance;
const student_validation_1 = require("./student.validation");
const student_service_1 = require("./student.service");
// ========== CREATE ==========
async function createRegistration(req, res) {
    try {
        const parsed = student_validation_1.CreateStudentCourseRegistration.parse(req.body);
        const registration = await student_service_1.StudentService.createRegistration(parsed);
        res.status(201).json(registration);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// ========== UPDATE ==========
async function updateRegistration(req, res) {
    try {
        const { id } = req.params;
        const parsed = student_validation_1.UpdateStudentCourseRegistration.parse({ ...req.body, id });
        const { id: _, ...updateData } = parsed;
        const updatedRegistration = await student_service_1.StudentService.updateRegistration(id, updateData);
        res.json(updatedRegistration);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// ========== DELETE ==========
async function deleteRegistration(req, res) {
    try {
        const { id } = req.params;
        const parsed = student_validation_1.DeleteStudentCourseRegistration.parse({ id });
        const result = await student_service_1.StudentService.deleteRegistration(parsed.id);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function markAttendance(req, res) {
    try {
        const parsed = student_validation_1.markAttendanceSchema.parse(req.body); // token will come as query param
        const studentId = req.user?.id; // from auth middleware
        if (!studentId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const record = await student_service_1.StudentService.markAttendance(studentId, parsed);
        res.status(201).json(record);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//# sourceMappingURL=student.controller.js.map