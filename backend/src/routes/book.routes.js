import express from 'express';
import { createBook, checkBookAvailability, updateBookDetails, getAllBooks, deleteBook } from '../controllers/book.controller.js';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', createBook);
router.get('/availability/:id', checkBookAvailability);
router.put('/:id', updateBookDetails);
router.delete('/:id', deleteBook);

export default router;