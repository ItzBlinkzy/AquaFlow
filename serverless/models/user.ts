const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bookingId: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  workshopType: {
    type: String,
    required: true,
  },
  workshopDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookings: {
    type: [bookingSchema],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User