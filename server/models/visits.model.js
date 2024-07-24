const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisitsSchema = new Schema({
  paravatId: { type: String },
  beneficiaryId: { type: String },
  status: { type: String, enum: ["Pending", "Completed", "Incomplete"] },
  date: { type: Date ,default: Date.now},
  comments: { type: String, default: "NONE" },
  health: { type: String },
  isAlive: { type: Boolean },
  CurrentWeight: { type: Number },
  isPregnant: { type: Boolean },
  Soldfor: { type: Number },
  latitude: { type: String, required: false },
  longitude: { type: String, required: false },
});

module.exports = mongoose.model("Visits", VisitsSchema);
