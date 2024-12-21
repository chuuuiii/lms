import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import { createError } from '../utils/errorUtils.js';
import { generateToken } from '../utils/jwt.js';
import validator from 'validator';
import bcrypt from 'bcrypt';

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // res.status(400);
    throw createError(400, 'Please provide all the required fields');
  }

  if (!validator.isEmail(email)) {
    throw createError(400, 'Please provide a valid email');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    // res.status(400);
    throw createError(400, 'User already registered');
  }

  if (password.length < 6) {
    throw createError(400, 'Password must be at least 6 characters long');
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  
  const user = await User.create({ name, email, password: hashedPassword, membershipStatus: 'Active', });
  const token = generateToken(user._id);
  res.status(201).json({ success: true, message: 'User created successfully', user: {
    _id: user._id, name: user.name, email: user.email, role: user.role, membershipStatus: user.membershipStatus, token: token
  }});

});