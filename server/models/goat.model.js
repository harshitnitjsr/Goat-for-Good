const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoatSchema = new Schema(
  {
    ben_id: { type: String }, // Assuming ben_id is the reference to Benefic model
    health: {
      type: String,
      default: "Healthy",
      enum: ["Healthy", "Mild", "Severe"],
    },
    isAlive: { type: Boolean, default: true },
    gender: { type: String, enum: ["Male", "Female"] },
    currentWeight: { type: Number },
    weightArray: [
      {
        weight: { type: Number },
        date: { type: Date },
      },
    ],
    breed: { type: String },
    year_of_birth: { type: Number }, // Calculated based on date of birth (dob) field
    isPregnant: { type: Boolean },
    soldFor: { type: Number },
    tagId: { type: String, default: "!@#ABC" },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields automatically

module.exports = mongoose.model("Goat", GoatSchema);
