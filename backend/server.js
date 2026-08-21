const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const bmiRouter = require("./routes/bmiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bmi", bmiRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send("BMI Calculator Backend is running!");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});