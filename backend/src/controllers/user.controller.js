import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import { createError } from '../utils/errorUtils.js';

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // res.status(400);
    throw createError(400, 'Please provide all the required fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    // res.status(400);
    throw createError(400, 'User already registered');
  }

  const user = await User.create({ name, email, password, membershipStatus: 'active' });
  if (user) {
    res.status(201).json({ success: true, message: 'User created successfully', user: { _id: user._id, name: user.name, email: user.email, membershipStatus: user.membershipStatus }});
  } 
  // else {
  //   res.status(400);
  //   throw new Error('Invalid user data');
  // }
});