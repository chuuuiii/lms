import mongoose, { Schema } from "mongoose";


const BorrowSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book',
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active'
  }
}, { timestamps: true});

//update book availability
BorrowSchema.pre('save', async function (next) {
  if (this.isNew) {
    const book = await this.model('Book').findById(this.book);
    if (book) {
      const updatedBorrowCount = book.currentBorrows + 1;

      await book.updateOne({
        currentBorrows: updatedBorrowCount,
        availability: updatedBorrowCount < book.totalCopies,
      });
    }
  }
  next();
});

const Borrow = mongoose.model('Borrow', BorrowSchema);
export default Borrow;