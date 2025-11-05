"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseOffering = createCourseOffering;
exports.updateCourseOffering = updateCourseOffering;
exports.deleteCourseOffering = deleteCourseOffering;
const courseOffer_validation_1 = require("./courseOffer.validation");
const courseOffer_service_1 = require("./courseOffer.service");
// ========== CREATE COURSE OFFERING ==========
async function createCourseOffering(req, res) {
    try {
        const parsed = courseOffer_validation_1.CreateCourseOffering.parse(req.body);
        const offering = await courseOffer_service_1.CourseOfferingService.createCourseOffering(parsed);
        res.status(201).json(offering);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// ========== UPDATE COURSE OFFERING ==========
async function updateCourseOffering(req, res) {
    try {
        const { id } = req.params; // get offering id from URL
        const parsed = courseOffer_validation_1.UpdateCourseOffering.parse({ ...req.body, id }); // merge id for validation
        const { id: _, ...updateData } = parsed; // exclude id from update data
        const updatedOffering = await courseOffer_service_1.CourseOfferingService.updateCourseOffering(id, updateData);
        res.json(updatedOffering);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// ========== DELETE COURSE OFFERING ==========
async function deleteCourseOffering(req, res) {
    try {
        const { id } = req.params; // get offering id from URL
        const parsed = courseOffer_validation_1.DeleteCourseOffering.parse({ id });
        const result = await courseOffer_service_1.CourseOfferingService.deleteCourseOffering(parsed.id);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//# sourceMappingURL=courseOffer.controller.js.map