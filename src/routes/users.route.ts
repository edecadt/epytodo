import express from 'express';
import { deleteUserById, getUserInfoByIdOrEmail } from '../controllers/users.controller';

const router = express.Router();

router.get('/:idOrEmail', getUserInfoByIdOrEmail);
router.delete('/:id', deleteUserById);

export default router;
