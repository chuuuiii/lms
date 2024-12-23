import mongoose, { Schema } from "mongoose";



const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [6, 'Password must be at least 6 characters long']
  },
  role: {
    type: String,
    required: true,
    enum: ['librarian', 'user'],
    default: 'user'

  },
  membershipStatus: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active'
  },
  memberShipDate: {
    type: Date,
    default: Date.now
  },
  borrowedBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Borrow'
  }], 
  maxBooksAllowed: {
    type: Number,
    default: 3
  }

}, { timestamps: true });


//check if user can borrow more books
// UserSchema.virtual('canBorrow').get(function () {
//   return this.borrowedBooks.length < this.maxBooksAllowed && this.membershipStatus === 
//   'Active'
// });

const User = mongoose.model('User', UserSchema);
export default User;