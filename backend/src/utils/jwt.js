// utils/jwt.js
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const generateToken = (_id) => {
  if (!config.secretKEY) {
    throw new Error('SECRET_KEY is not defined');
  }
  return jwt.sign({ _id }, config.secretKEY, { expiresIn: '3d' });
};
