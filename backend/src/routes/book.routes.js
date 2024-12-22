import express from 'express';
import { createBook, checkBookAvailability } from '../controllers/book.controller.js';

const router = express.Router();

router.post('/', createBook);
router.get('/availability/:id', checkBookAvailability);

export default router;