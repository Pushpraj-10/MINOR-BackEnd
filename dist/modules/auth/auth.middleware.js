"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
exports.authorizeRoles = authorizeRoles;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// ========== Authenticate Token ==========
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1]; // Bearer <token>
    if (!token)
        return res.status(401).json({ error: "Access token required" });
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        console.log(payload);
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
// ========== Authorize Roles ==========
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user)
            return res.status(401).json({ error: "User not authenticated" });
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access denied: insufficient permissions" });
        }
        next();
    };
}
//# sourceMappingURL=auth.middleware.js.map