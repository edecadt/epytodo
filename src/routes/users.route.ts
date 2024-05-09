import express from 'express';
import { deleteUserById, getUserInfoByIdOrEmail, updateUserById } from '../controllers/users.controller';

const router = express.Router();

router.get('/:idOrEmail', getUserInfoByIdOrEmail);
router.delete('/:id', deleteUserById);
router.put('/:id', updateUserById);

export default router;
