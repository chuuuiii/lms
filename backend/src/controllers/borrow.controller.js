import AsyncHandler from "express-async-handler";
import Book from "../models/book.model.js";
import Borrow from "../models/borrow.model.js";
import User from "../models/user.model.js";
import { createError } from "../utils/errorUtils.js";


export const borrowBook = AsyncHandler(async (req, res) => {
  const { userId, bookId } = req.body;


  if (!userId || !bookId) {
    res.status(400);
    throw createError(400, 'Please provide both userId and bookId fields');
  }

  //check if book is available
  const book = await Book.findById(bookId);
  if (!book || book.currentBorrows >= book.totalCopies) {
    // res.status(400);
    throw createError(400, 'Book not available');
  }

  //check user current borrows
  const activeLoans = await Borrow.countDocuments({ user: userId, status: 'Active'});

  //check user borrow limit
  if (activeLoans >= 3) {
    // res.status(400);
    throw createError(400, 'User has reached maximum borrow limit');
  }

  //create borrow record
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);

  const borrow = await Borrow.create({ user: userId, book: bookId, dueDate, status: 'Active' });

  //update borrowed book
  await User.findByIdAndUpdate(userId, { $push: { borrowedBooks: borrow._id} });

  res.status(201).json({ success: true, message: 'Book borrowed successfully', borrow })
});