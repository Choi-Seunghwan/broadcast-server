import express from 'express';
import room from './room';

const router = express.Router();

router.use('/room', room);

export default router;
