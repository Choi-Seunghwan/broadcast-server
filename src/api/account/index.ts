import controller from './account.controller';
import express from 'express';

const router = express.Router();

router.post('/login', controller.login);

export default router;
