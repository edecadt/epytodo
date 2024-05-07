import express from 'express';
import {registerUser} from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', registerUser);
// router.post('/login', );

export default router;