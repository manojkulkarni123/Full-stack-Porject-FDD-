const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// GET all donations
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new donation
router.post("/", async (req, res) => {
  const donation = new Donation({
    foodItem: req.body.foodItem,
    quantity: req.body.quantity,
    donorName: req.body.donorName,
    location: req.body.location,
    expirationDate: new Date(req.body.expirationDate),
  });

  try {
    const newDonation = await donation.save();
    res.status(201).json(newDonation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
