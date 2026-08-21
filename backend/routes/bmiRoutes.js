const express = require("express");
const BMI = require("../models/BMI");

const router = express.Router();

router.post("/calculate", async (req, res) => {
  try {
    const { weight, height } = req.body;

    if (!weight || !height) {
      return res.status(400).json({
        message: "Weight and height are required",
      });
    }

    const heightInMeters = height / 100;

    const bmiValue =
      weight / (heightInMeters * heightInMeters);

    let category;

    if (bmiValue < 18.5) {
      category = "Underweight";
    } else if (bmiValue < 25) {
      category = "Normal weight";
    } else if (bmiValue < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    const bmiData = new BMI({
      weight,
      height,
      bmi: Number(bmiValue.toFixed(2)),
      category,
    });

    const savedBMI = await bmiData.save();

    res.status(201).json(savedBMI);
  } catch (error) {
    res.status(500).json({
      message: "Error calculating BMI",
      error: error.message,
    });
  }
});

module.exports = router;