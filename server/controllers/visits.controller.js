const express = require("express");
const Visit = require("../models/visits.model");
const Baneficial = require("../models/benef.model");
const Goat = require("../models/goat.model");
require("dotenv").config({ path: "../.env" });
require("dotenv").config();

// Controller to handle POST requests to create a new Paravat entry
exports.visitadd = async (req, res) => {
  const requiredFields = ["paravatId", "beneficiaryId", "status", "date"];
  const missingFields = requiredFields.filter((field) => !(field in req.body));

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const visit = new Visit({
    paravatId: req.body.paravatId,
    beneficiaryId: req.body.beneficiaryId,
    status: req.body.status,
    date: req.body.date,
  });

  try {
    const newVisit = await visit.save();
    res.status(201).json(newVisit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.visitget = async (req, res) => {
  try {
    const visit = await Visit.find({});
    return res.json({ success: true, msg: visit });
  } catch (error) {
    return res.json({
      success: false,
      msg: error,
    });
  }
};

exports.updateVisitStatus = async (req, res) => {
  const paravatId = req.body.paravatId;
  const beneficiaryId = req.body.beneficiaryId;
  const date = req.body.date;

  try {
    const visit = await Visit.findOneAndUpdate({
      paravatId: paravatId,
      beneficiaryId: beneficiaryId,
      date: date,
    });

    if (!visit) {
      return res.status(405).json({
        success: false,
        message: `Visit with ID ${paravatId} not found`,
      });
    }

    visit.status = req.body.status;
    visit.comments = req.body.comments;
    const updatedVisit = await visit.save();

    res.json({ success: true, data: updatedVisit });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVisitsByParavatId = async (req, res) => {
  const paravatId = req.params.paravatId;

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const visits = await Visit.aggregate([
      {
        $match: {
          paravatId: String(paravatId),
          date: { $gte: startOfDay, $lt: endOfDay },
        },
      },
      { $sort: { date: -1 } },
    ]);

    const visitsWithBeneficiaries = await Promise.all(
      visits.map(async (visit) => {
        if (visit.beneficiaryId.length === 24) {
          const beneficiary = await Baneficial.findById(visit.beneficiaryId);
          if (beneficiary) {
            return {
              ...visit,
              beneficiary: beneficiary.toObject(),
            };
          }
        }
        return visit;
      })
    );

    res.json({ success: true, data: visitsWithBeneficiaries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// New update controller
exports.updateVisit = async (req, res) => {
  const { paravatId, beneficiaryId, tagId } = req.body;

  if (!paravatId || !beneficiaryId) {
    return res.status(400).json({
      success: false,
      message: "paravatId, beneficiaryId, and date are required.",
    });
  }

  try {
    const visit = await Visit.findOne({ paravatId, beneficiaryId });
    const goat = await Goat.findOne({ tagId });
    if (!visit) {
      return res
        .status(404)
        .json({ success: false, message: "Visit not found." });
    }
    if (!goat) {
      return res.json({ success: false, msg: "goat not found" });
    }

    const updatableFields = [
      "status",
      "comments",
      "health",
      "isAlive",
      "CurrentWeight",
      "isPregnant",
      "Soldfor",
      "latitude",
      "longitude",
    ];
    updatableFields.forEach((field) => {
      if (field in req.body) {
        visit[field] = req.body[field];
      }
    });

    const updatedVisit = await visit.save();
    const updateGoatparams = [
      "isAlive",
      "CurrentWeight",
      "soldFor",
      "isPregnant",
    ];
    updateGoatparams.forEach((field) => {
      if (field in req.body) {
        goat[field] = req.body[field];
      }
    });
const currentWeight=req.body.CurrentWeight
goat.weightArray.push({ weight: currentWeight, date: new Date() });

    const updatedGoat = await goat.save();
    res.json({ success: true, data: updatedVisit, goatjson: updatedGoat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};