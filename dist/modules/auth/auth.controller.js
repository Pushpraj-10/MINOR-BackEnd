"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStudent = registerStudent;
exports.registerProfessor = registerProfessor;
exports.login = login;
const auth_validation_1 = require("./auth.validation");
const auth_service_1 = require("./auth.service");
async function registerStudent(req, res) {
    const parsed = auth_validation_1.studentRegisterSchema.parse(req.body);
    const student = await auth_service_1.AuthService.registerStudent(parsed);
    res.status(201).json(student);
}
async function registerProfessor(req, res) {
    const parsed = auth_validation_1.professorRegisterSchema.parse(req.body);
    const professor = await auth_service_1.AuthService.registerProfessor(parsed);
    res.status(201).json(professor);
}
async function login(req, res) {
    const parsed = auth_validation_1.loginSchema.parse(req.body);
    const tokens = await auth_service_1.AuthService.login(parsed);
    res.json(tokens);
}
//# sourceMappingURL=auth.controller.js.map