import { Router } from 'express';
import { signup, login, getUser } from '../controllers/auth.controller';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/get-user', getUser);

export default router;
