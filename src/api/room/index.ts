import controller from './room.controller';
import express from 'express';

const router = express.Router();

router.get('/roomList', controller.getRoomList);

export default router;
