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
  ISBN: {
    type: String,
    required: [true, 'Please provide ISBN number'],
    unique: true,
    minLength: [10, 'ISBN must be minimum of 10 characters long'],
    maxLength: [13, 'ISBN must be maximum of 13 characters long']
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