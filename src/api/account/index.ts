import controller from './account.controller';
import express from 'express';

const router = express.Router();

router.get('/login', controller.login);

export default router;
