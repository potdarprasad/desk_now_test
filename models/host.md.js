const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const HostSchema = new mongoose.Schema(
  {
    id: { type: String, unique: "Booking With This Id Already Exist" },
    coordinate: { type: Object },
    hostName: { type: String },
    address: { type: String },
    property: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

//Validate Data
HostSchema.plugin(validator);

module.exports = mongoose.model("hosts", HostSchema);
