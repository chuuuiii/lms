import mongoose, { Schema } from "mongoose";


const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide book title'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Please provide author name'],
    trim: true
  },
  genre: {
    type: String,
    enum: [
      'Technology', 'Science', 'Math', 'Filipino', 'English'
    ],
    required: [true, 'Please select genre']
  },
  availability: {
    type: Boolean,
    default: true,
  },
  totalCopies: {
    type: Number,
    required: [true, 'Please provide total number of copies'],
    min: [1, 'Must have at least one copy']
  },
  currentBorrows: {
    type: Number,
    default: 0
  }
}, { timestamps: true});

const Book = mongoose.model('Book', BookSchema);
export default Book;