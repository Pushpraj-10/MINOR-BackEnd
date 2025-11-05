"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const batch_controller_1 = require("./batch.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = (0, express_1.Router)();
// ========== Create COURSE ==========
router.post("/batch", auth_middleware_1.authenticateToken, batch_controller_1.createBatch);
// ========== UPDATE COURSE ==========
router.patch("/batch/:code", auth_middleware_1.authenticateToken, batch_controller_1.updateBatch);
// ========== DELETE COURSE ==========
router.delete("/batch/:code", auth_middleware_1.authenticateToken, batch_controller_1.deleteBatch);
exports.default = router;
//# sourceMappingURL=batch.router.js.map