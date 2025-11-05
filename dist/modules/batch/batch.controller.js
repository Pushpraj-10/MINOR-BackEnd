"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBatch = createBatch;
exports.updateBatch = updateBatch;
exports.deleteBatch = deleteBatch;
const batch_validation_1 = require("./batch.validation");
const batch_service_1 = require("./batch.service");
// ========== CREATE BATCH ==========
async function createBatch(req, res) {
    try {
        const parsed = batch_validation_1.CreateBatch.parse(req.body);
        const batch = await batch_service_1.BatchService.createBatch(parsed);
        res.status(201).json(batch);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// ========== UPDATE BATCH ==========
async function updateBatch(req, res) {
    try {
        const { id } = req.params; // batch id comes from URL
        const parsed = batch_validation_1.UpdateBatch.parse({ ...req.body, id }); // merge id with body for validation
        const { id: batchId, ...updateData } = parsed;
        const updatedBatch = await batch_service_1.BatchService.updateBatch(batchId, updateData);
        res.json(updatedBatch);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// ========== DELETE BATCH ==========
async function deleteBatch(req, res) {
    try {
        const { id } = req.params; // batch id comes from URL
        const parsed = batch_validation_1.DeleteBatch.parse({ id });
        const result = await batch_service_1.BatchService.deleteBatch(parsed.id);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//# sourceMappingURL=batch.controller.js.map