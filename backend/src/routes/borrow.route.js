import express from 'express';
import { borrowBook } from '../controllers/borrow.controller.js';

const router = express.Router();

router.post('/', borrowBook);

export default router;