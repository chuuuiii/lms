import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) {
  console.error('PORT environment is not defined');
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI environment is not defined');
  process.exit(1);
};

// if (!process.env.SECRET_KEY) {
//   console.error('SECRET_KEY environment is not defined');
// }

export const config = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  secretKEY: process.env.SECRET_KEY
};

