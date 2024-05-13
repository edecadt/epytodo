import express from 'express';
import { getUserInfos, getUserTodos } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getUserInfos);
router.get('/todos', getUserTodos);

export default router;
