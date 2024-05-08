import express from 'express';
import { getUserInfos } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getUserInfos);

export default router;
