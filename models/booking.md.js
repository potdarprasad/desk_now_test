const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const BookingSchema = new mongoose.Schema(
  {
    id: { type: String, unique: "Booking With This Id Already Exist" },
    coordinate: { type: Object },
    name: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

//Validate Data
BookingSchema.plugin(validator);

module.exports = mongoose.model("bookings", BookingSchema);
