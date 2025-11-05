"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseOffer_controller_1 = require("./courseOffer.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = (0, express_1.Router)();
// ========== CREATE ==========
router.post("/courseOffering", auth_middleware_1.authenticateToken, courseOffer_controller_1.createCourseOffering);
// ========== UPDATE ==========
router.patch("/courseOffering/:code", auth_middleware_1.authenticateToken, courseOffer_controller_1.updateCourseOffering);
// ========== DELETE ==========
router.delete("/courseOffering/:code", auth_middleware_1.authenticateToken, courseOffer_controller_1.deleteCourseOffering);
exports.default = router;
//# sourceMappingURL=courseOffer.router.js.map