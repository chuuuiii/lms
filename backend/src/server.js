import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import { config } from './config/env.js';
import userRoutes from './routes/user.routes.js';
import errorHandler from './middlewares/errorMiddleware.js';
import bookRoutes from './routes/book.routes.js';
import borrowRoutes from './routes/borrow.route.js';


const app = express();
//db connection
connectDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'))

//routes
app.use('/api/users', userRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/borrow', borrowRoutes)

//error handling
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Server ready')
});

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`)
});