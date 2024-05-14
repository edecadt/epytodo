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
exports.deleteTodos = exports.putTodos = exports.postTodos = exports.getTodosById = exports.getAllUsersTodos = void 0;
const todos_service_1 = require("../services/todos.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_service_1 = require("../services/users.service");
const getAllUsersTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    const token = tokenHeader.split(' ')[1];
    const decoded = jsonwebtoken_1.default.decode(token);
    if (!decoded) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
    const allTodos = yield (0, todos_service_1.getAllTodos)();
    if (!allTodos) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
    res.status(200).json(allTodos);
});
exports.getAllUsersTodos = getAllUsersTodos;
const getTodosById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    const token = tokenHeader.split(' ')[1];
    const decoded = jsonwebtoken_1.default.decode(token);
    if (!decoded) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
    const TodoId = parseInt(req.params.id);
    if (isNaN(TodoId)) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }
    const TodoInfos = yield (0, todos_service_1.getIdTodos)(TodoId);
    if (!TodoInfos) {
        return res.status(404).json({ msg: 'Not found' });
    }
    res.status(200).json(TodoInfos);
});
exports.getTodosById = getTodosById;
const postTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    const token = tokenHeader.split(' ')[1];
    const decoded = jsonwebtoken_1.default.decode(token);
    if (!decoded) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
    const { title, description, due_time, user_id, status } = req.body;
    if (!title || !description || !due_time || !user_id || !status)
        return res.status(400).json({ msg: 'Bad parameter' });
    const user_exist = yield (0, users_service_1.getUserInfosById)(parseInt(user_id));
    if (!user_exist)
        return res.status(400).json({ msg: 'Bad parameter' });
    try {
        const newTodo = yield (0, todos_service_1.createTodo)(title, description, due_time, user_id, status);
        if (newTodo != null) {
            return res.status(201).json(newTodo);
        }
        else {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
});
exports.postTodos = postTodos;
const putTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    const token = tokenHeader.split(' ')[1];
    const decoded = jsonwebtoken_1.default.decode(token);
    if (!decoded) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
    const TodoId = parseInt(req.params.id);
    if (isNaN(TodoId)) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }
    const TodosInfos = yield (0, todos_service_1.getIdTodos)(TodoId);
    if (!TodosInfos) {
        return res.status(404).json({ msg: 'Not found' });
    }
    const { title, description, due_time, user_id, status } = req.body;
    if (!title || !description || !due_time || !user_id) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }
    const user_exist = yield (0, users_service_1.getUserInfosById)(parseInt(user_id));
    if (!user_exist)
        return res.status(400).json({ msg: 'Bad parameter' });
    if (!(yield (0, todos_service_1.updateTodoById)(TodoId, title, description, due_time, user_id, status))) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
    const TodoInfosUpdated = yield (0, todos_service_1.getIdTodos)(TodoId);
    if (!TodoInfosUpdated) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
    return res.status(200).json({
        title: TodoInfosUpdated === null || TodoInfosUpdated === void 0 ? void 0 : TodoInfosUpdated.title,
        description: TodoInfosUpdated === null || TodoInfosUpdated === void 0 ? void 0 : TodoInfosUpdated.description,
        due_time: TodoInfosUpdated === null || TodoInfosUpdated === void 0 ? void 0 : TodoInfosUpdated.due_time,
        user_id: TodoInfosUpdated === null || TodoInfosUpdated === void 0 ? void 0 : TodoInfosUpdated.user_id,
        status: TodoInfosUpdated === null || TodoInfosUpdated === void 0 ? void 0 : TodoInfosUpdated.status,
    });
});
exports.putTodos = putTodos;
const deleteTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    const token = tokenHeader.split(' ')[1];
    const decoded = jsonwebtoken_1.default.decode(token);
    if (!decoded) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
    const TodoId = parseInt(req.params.id);
    if (isNaN(TodoId)) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }
    const TodoInfos = yield (0, todos_service_1.getIdTodos)(TodoId);
    if (!TodoInfos) {
        return res.status(404).json({ msg: 'Not found' });
    }
    if (!(yield (0, todos_service_1.deleteTodosById)(TodoId))) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
    return res.status(200).json({ msg: `Successfully deleted record number : ${TodoId}` });
});
exports.deleteTodos = deleteTodos;
