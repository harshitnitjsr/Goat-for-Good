


const express = require("express");
const Baneficial = require("../models/benef.model");
require("dotenv").config({ path: "../.env" });

// Controller to handle POST requests to create a new Baneficial entry
exports.createBanef = async (req, res) => {
  // Check if all required fields are provided
  const requiredFields = ["name", "latitude", "longitude", "address"];
  const missingFields = requiredFields.filter((field) => !(field in req.body));

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const baneficial = new Baneficial({
    name: req.body.name,
    address: req.body.address,
    PhoneNumber: req.body.PhoneNumber,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });

  try {
    const newBaneficial = await baneficial.save();
    res.status(201).json(newBaneficial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  console.log(req.body);
};

// Controller to handle POST requests to add a goat to a beneficiary
exports.addGoatToBeneficiary = async (req, res) => {
  try {
    const beneficiaryId = req.body.beneficiaryId;
    const tagId = req.body.tagId;
    
    // Check if beneficiaryId and tagId are present in the request
    
    
    // Find the beneficiary by ID
    // console.log(beneficiaryId);
    const beneficiary = await Baneficial.findById(String(beneficiaryId));
    // console.log(beneficiaryId);
    if (!beneficiary) {
      return res.status(404).json({ message: "Beneficiary not found" });
    }
    
    // Add the tag ID to the array of goats
    beneficiary.Goats.push(tagId);
    
    // Save the updated beneficiary
    const updatedBeneficiary = await beneficiary.save();
    res.status(200).json(updatedBeneficiary);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  console.log(req.body);
  

};



// Controller to handle GET requests to find all Baneficial entries
exports.FindBaneficial = async (req, res) => {
  try {
    const baneficial = await Baneficial.find({});
    return res.json({ success: true, msg: baneficial });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};
