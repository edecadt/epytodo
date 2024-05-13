"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTodos = exports.getUserInfos = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_service_1 = require("../services/users.service");
const todos_service_1 = require("../services/todos.service");
const getUserInfos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    const token = tokenHeader.split(' ')[1];
    const decoded = jsonwebtoken_1.default.decode(token);
    if (!decoded) {
        return res.status(401).json({ msg: 'Invalid token format' });
    }
    const userInfo = yield (0, users_service_1.getUserInfosById)(decoded.id);
    if (!userInfo) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
    res.status(200).json({
        id: userInfo.id,
        email: userInfo.email,
        password: userInfo.password,
        created_at: userInfo.created_at,
        firstname: userInfo.firstname,
        name: userInfo.name,
    });
});
exports.getUserInfos = getUserInfos;
const getUserTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    const token = tokenHeader.split(' ')[1];
    const decoded = jsonwebtoken_1.default.decode(token);
    if (!decoded) {
        return res.status(401).json({ msg: 'Invalid token format' });
    }
    const userTodos = yield (0, todos_service_1.getUserTodosById)(decoded.id);
    if (!userTodos) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
    res.status(200).json(userTodos);
});
exports.getUserTodos = getUserTodos;
