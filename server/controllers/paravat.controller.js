const express = require("express");
const Paravat = require("../models/paravat.model");
require("dotenv").config({ path: "../.env" });

require("dotenv").config();

// Controller to handle POST requests to create a new Paravat entry
exports.createParavat = async (req, res) => {
  //   Check if all required fields are provided
  const requiredFields = ["userId", "name", "address", "PhoneNumber", "email"];
  const missingFields = requiredFields.filter((field) => !(field in req.body));

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const paravat = new Paravat({
    userId: req.body.userId,
    name: req.body.name,
    address: req.body.address,
    PhoneNumber: req.body.PhoneNumber,
    email: req.body.email,
  });

  try {
    const newParavat = await paravat.save();
    res.status(201).json(newParavat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.findParavat = async (req, res) => {
  try {
    const paravat = await Paravat.find({});
    return res.json({ success: true, mdg: paravat });
  } catch (error) {
    return res.json({
      success: false,
      msg: error,
    });
  }
};

// Endpoint to increment no_of_assignments
exports.incrementAssignments = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a URL parameter

  try {
    const updatedParavat = await Paravat.findOneAndUpdate(
      { userId: userId },
      { $inc: { no_of_assignments: 1 } }, // Increment no_of_assignments by 1
      { new: true } // Return the updated document
    );

    if (!updatedParavat) {
      return res.status(404).json({ message: "Paravat not found" });
    }

    res.status(200).json(updatedParavat);
  } catch (error) {
    res.status(500).json({ message: "Error updating Paravat", error: error });
  }
};

// Endpoint to increment no_of_completed_assignments
exports.incrementCompletedAssignments = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a URL parameter

  try {
    const updatedParavat = await Paravat.findOneAndUpdate(
      { userId: userId },
      { $inc: { no_of_completed_assignments: 1 } }, // Increment no_of_completed_assignments by 1
      { new: true } // Return the updated document
    );

    if (!updatedParavat) {
      return res.status(404).json({ message: "Paravat not found" });
    }

    res.status(200).json(updatedParavat);
  } catch (error) {
    res.status(500).json({ message: "Error updating Paravat", error: error });
  }
};
