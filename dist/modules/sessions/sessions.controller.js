"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = createSession;
exports.updateSession = updateSession;
exports.deleteSession = deleteSession;
const sessions_validation_1 = require("./sessions.validation");
const sessions_service_1 = require("./sessions.service");
// ========== CREATE SESSION ==========
async function createSession(req, res) {
    try {
        const parsed = sessions_validation_1.sessionCreationSchema.parse(req.body);
        const session = await sessions_service_1.SessionService.createSession(parsed);
        res.status(201).json(session);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// ========== UPDATE SESSION ==========
async function updateSession(req, res) {
    try {
        const { id } = req.params; // session id comes from URL
        const parsed = sessions_validation_1.sessionUpdationSchema.parse({ ...req.body, id }); // merge id into body for validation
        const updatedSession = await sessions_service_1.SessionService.updateSession(parsed);
        res.json(updatedSession);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// ========== DELETE SESSION ==========
async function deleteSession(req, res) {
    try {
        const { id } = req.params; // session id comes from URL
        const parsed = sessions_validation_1.sessionDeletionSchema.parse({ id });
        const result = await sessions_service_1.SessionService.deleteSession(parsed);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//# sourceMappingURL=sessions.controller.js.map