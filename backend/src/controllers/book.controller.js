import Book from "../models/book.model.js";
import AsyncHandler from "express-async-handler";
import { createError } from "../utils/errorUtils.js";



export const createBook = AsyncHandler(async (req, res) => {
  const { title, author, genre, ISBN, totalCopies } = req.body;

  if (!title || !author || !genre || !ISBN || !totalCopies) {
    throw createError(400, 'Please provide all the required fields');
  }

  const bookExists = await Book.findOne({ ISBN});
  if (bookExists) {
    throw createError(400, 'Book already registered with this ISBN');
  }

  const book = await Book.create({ title, author, genre, ISBN, totalCopies});

  res.status(200).json(book);

});

export const checkBookAvailability = AsyncHandler(async (req, res) => {
  // const { id } = req.params;

  // const book = await Book.findById(id);

  const book = await Book.findById(req.params.id);

  if (!book) {
    throw createError(404, 'Book not fount');
  }

  res.status(200).json({ availability: book.availability, totalCopies: book.totalCopies, currentBorrows: book.currentBorrows })
});