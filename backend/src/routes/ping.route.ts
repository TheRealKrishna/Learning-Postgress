import { Router } from 'express';
import { handlePing } from '../controllers/ping.controller';

const router = Router();

router.get('/', handlePing);

export default router;
