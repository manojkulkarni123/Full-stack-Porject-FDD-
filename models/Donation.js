const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  foodItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  donorName: { type: String, required: true },
  location: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donation", donationSchema);
