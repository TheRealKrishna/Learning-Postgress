import { Router } from 'express';
import { handlePing } from '../controllers/pingController';

const router = Router();

router.get('/', handlePing);

export default router;
