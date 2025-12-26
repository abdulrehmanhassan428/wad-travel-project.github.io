const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  packageName: String,
  departureCity: String,
  departureDate: Date,
  groupSize: Number,

  fullName: String,
  phone: String,
  cnic: String,
  totalPersons: Number,
  totalPayment: Number,

  paymentMethod: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("booking", BookingSchema);
