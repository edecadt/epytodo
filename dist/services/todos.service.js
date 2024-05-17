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
exports.deleteTodosById = exports.updateTodoById = exports.createTodo = exports.getIdTodos = exports.getAllTodos = exports.getUserTodosById = void 0;
const db_1 = __importDefault(require("../configs/db"));
const getUserTodosById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.execute("SELECT id, title, description, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at, DATE_FORMAT(due_time, '%Y-%m-%d %H:%i:%s') as due_time, user_id, status FROM todo WHERE user_id = ?", [userId]);
        return rows;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserTodosById = getUserTodosById;
const getAllTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.execute("SELECT id, title, description, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at, DATE_FORMAT(due_time, '%Y-%m-%d %H:%i:%s') as due_time, user_id, status FROM todo");
        return rows;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllTodos = getAllTodos;
const getIdTodos = (TodoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.execute("SELECT id, title, description, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at, DATE_FORMAT(due_time, '%Y-%m-%d %H:%i:%s') as due_time, user_id, status FROM todo WHERE id = ?", [TodoId]);
        if (Array.isArray(rows)) {
            if (rows.length === 1) {
                return rows[0];
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getIdTodos = getIdTodos;
const createTodo = (title, description, due_time, user_id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield db_1.default.execute('INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)', [title, description, due_time, user_id, status]);
        if (result && result.affectedRows === 1) {
            const insertedTodo = yield (0, exports.getIdTodos)(result.insertId);
            return insertedTodo;
        }
        else {
            return null;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.createTodo = createTodo;
const updateTodoById = (TodoId, title, description, due_time, user_id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield db_1.default.execute('UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?', [title, description, due_time, user_id, status, TodoId]);
        return result.affectedRows === 1;
    }
    catch (error) {
        throw error;
    }
});
exports.updateTodoById = updateTodoById;
const deleteTodosById = (TodoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield db_1.default.execute('DELETE FROM todo WHERE id = ?', [TodoId]);
        return result.affectedRows === 1;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTodosById = deleteTodosById;
