const express = require("express");
const mongoose = require("mongoose");
const donationRoutes = require("./routes/donationRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/food_donation_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Routes
app.use("/api/donations", donationRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
