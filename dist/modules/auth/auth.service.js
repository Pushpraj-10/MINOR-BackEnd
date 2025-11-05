"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const REFRESH_TOKEN_EXPIRES_IN = "7d";
const JWT_EXPIRES_IN = "15m";
if (!JWT_SECRET || !REFRESH_TOKEN_EXPIRES_IN || !JWT_EXPIRES_IN) {
    throw new Error("JWT_SECRET, JWT_EXPIRES_IN or REFRESH_TOKEN_EXPIRES_IN is not defined");
}
class AuthService {
    static async registerStudent(data) {
        const existing = await prisma_1.default.user.findUnique({ where: { email: data.email } });
        if (existing)
            return { message: "Email already registered!" };
        const hash = await bcrypt_1.default.hash(data.password, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
        const student = await prisma_1.default.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash,
                role: "student",
                branch: data.branch
            },
        });
        return { id: student.id, email: student.email, role: student.role };
    }
    static async registerProfessor(data) {
        const existing = await prisma_1.default.user.findUnique({ where: { email: data.email } });
        if (existing)
            throw new Error("Email already registered");
        const hash = await bcrypt_1.default.hash(data.password, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
        const student = await prisma_1.default.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash,
                role: "professor"
            },
        });
        return { id: student.id, email: student.email, role: student.role };
    }
    static async login(data) {
        const user = await prisma_1.default.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            return { error: "This email is not registered" };
        }
        const valid = await bcrypt_1.default.compare(data.password, user.password);
        if (!valid)
            throw new Error("Incorrect Password!");
        const accessToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
        return { accessToken, refreshToken };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map