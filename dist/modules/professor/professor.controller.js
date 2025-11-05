"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfessorAssignment = createProfessorAssignment;
exports.updateProfessorAssignment = updateProfessorAssignment;
exports.deleteProfessorAssignment = deleteProfessorAssignment;
exports.generateSessionQR = generateSessionQR;
exports.getProfessorCourseOfferings = getProfessorCourseOfferings;
const professor_validation_1 = require("./professor.validation");
const professor_service_1 = require("./professor.service");
// ========== CREATE PROFESSOR ASSIGNMENT ==========
async function createProfessorAssignment(req, res) {
    try {
        const parsed = professor_validation_1.CreateProfessorAssignment.parse(req.body);
        const assignment = await professor_service_1.ProfessorService.createProfessorAssignment(parsed);
        res.status(201).json(assignment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// ========== UPDATE PROFESSOR ASSIGNMENT ==========
async function updateProfessorAssignment(req, res) {
    try {
        const { id } = req.params; // assignment id from URL
        const parsed = professor_validation_1.UpdateProfessorAssignment.parse({ ...req.body, id });
        const { id: _, ...updateData } = parsed; // exclude id from update
        const updatedAssignment = await professor_service_1.ProfessorService.updateProfessorAssignment(id, updateData);
        res.json(updatedAssignment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// ========== DELETE PROFESSOR ASSIGNMENT ==========
async function deleteProfessorAssignment(req, res) {
    try {
        const { id } = req.params; // assignment id from URL
        const parsed = professor_validation_1.DeleteProfessorAssignment.parse({ id });
        const result = await professor_service_1.ProfessorService.deleteProfessorAssignment(parsed.id);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// ========== GENERATE SESSION QR-TOKEN ==========
async function generateSessionQR(req, res) {
    try {
        const parsed = professor_validation_1.GenerateSessionQR.parse(req.body);
        const qrToken = await professor_service_1.ProfessorService.generateToken(parsed);
        res.status(201).json(qrToken);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// ========== GET PROFESSOR COURSE OFFERINGS ==========
async function getProfessorCourseOfferings(req, res) {
    try {
        // Get professorId from JWT payload (injected by middleware)
        const professorId = req.user?.id;
        if (!professorId) {
            return res.status(401).json({ error: "Unauthorized: professorId not found in token" });
        }
        // Call the service with professorId
        const offerings = await professor_service_1.ProfessorService.getProfessorCourseOfferings({ professorId });
        res.json(offerings);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//# sourceMappingURL=professor.controller.js.map