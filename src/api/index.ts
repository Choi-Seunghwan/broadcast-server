import express from 'express';
import account from './account';
import live from './live';

const router = express.Router();

router.use('/account', account);
router.use('/live', live);

export default router;
