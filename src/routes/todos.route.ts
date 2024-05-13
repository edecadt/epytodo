import express from 'express';
import { getAllUsersTodos, getTodosById, postTodos, putTodos, deleteTodos } from '../controllers/todos.controller';

const router = express.Router();

router.get('/', getAllUsersTodos);
router.get('/:id', getTodosById);
router.post('/', postTodos);
router.put('/:id', putTodos);
router.delete('/:id', deleteTodos);

export default router;
