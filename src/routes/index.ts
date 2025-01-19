'use strict';
import { Router } from 'express';

const router = Router();

import orderRouter from './order';
router.use('/orders', orderRouter);

export default router;

