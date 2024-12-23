import Book from "../models/book.model.js";
import AsyncHandler from "express-async-handler";
import { createError } from "../utils/errorUtils.js";
import mongoose from "mongoose";

//get all books
export const getAllBooks = AsyncHandler (async (req, res) => {

  const books = await Book.find({}).sort({ createdAt: -1 });

  if (!books || books.length === 0) {
    res.status(200).json({ success: true, message: 'No books available' });
  }

  res.status(200).json({ success: true, message: 'Books successfully fetched', books });

});

//create book
export const createBook = AsyncHandler(async (req, res) => {
  const { title, author, genre, ISBN, totalCopies } = req.body;

  if (!title || !author || !genre || !ISBN || !totalCopies) {
    res.status(400)
    throw createError(400, 'Please provide all the required fields');
  }


  const bookExists = await Book.findOne({ ISBN});
  if (bookExists) {
    res.status(400);
    throw createError(400, 'Book already registered with this ISBN');
  }

  const book = await Book.create({ title, author, genre, ISBN, totalCopies});

  res.status(200).json({ success: true, message: 'Book created successfully', book });

});

//check book availability
export const checkBookAvailability = AsyncHandler(async (req, res) => {
  // const { id } = req.params;

  // const book = await Book.findById(id);

  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw createError(404, 'Book not fount');
  }

  res.status(200).json({ availability: book.availability, totalCopies: book.totalCopies, currentBorrows: book.currentBorrows })
});

//update books
export const updateBookDetails = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw createError(400, 'Invalid book ID');
  }

  const updateBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
  if (!updateBook) {
    res.status(404);
    throw createError(404, 'Book not found');
  }

  res.status(200).json({ success: true, message: 'Book details updated successfully', updateBook });
});

//delete book
export const deleteBook = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw createError(400, 'Invalid book ID');
  }

  const deleteBook = await Book.findByIdAndDelete(id);
  if (!deleteBook) {
    res.status(404);
    throw createError(404, 'Book not found')
  }

  res.status(200).json({ success: true, message: 'Book deleted successfully', deleteBook})

});
