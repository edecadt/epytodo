"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_controller_1 = require("../controllers/todos.controller");
const router = express_1.default.Router();
router.get('/', todos_controller_1.getAllUsersTodos);
router.get('/:id', todos_controller_1.getTodosById);
router.post('/', todos_controller_1.postTodos);
router.put('/:id', todos_controller_1.putTodos);
router.delete('/:id', todos_controller_1.deleteTodos);
exports.default = router;
