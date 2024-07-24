const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParavatSchema = new Schema({
  userId: { type: String },
  name: { type: String },
  address: { type: String },
  PhoneNumber: { type: Number },
  email: { type: String },
  no_of_assignments: { type: Number, default: 0 },
  no_of_completed_assignments: { type: Number, default: 0 },
});

module.exports = mongoose.model("Paravat", ParavatSchema);
