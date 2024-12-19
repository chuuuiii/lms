import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors'
import morgan from 'morgan';


const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Server ready')
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});