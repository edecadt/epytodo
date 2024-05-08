import express from 'express';
import { getUserInfoByIdOrEmail } from '../controllers/users.controller';

const router = express.Router();

router.get('/:idOrEmail', getUserInfoByIdOrEmail);

export default router;
