

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BaneficialSchema = new Schema({
  name: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  address: { type: String, required: true },
  PhoneNumber: { type: Number, required: false },
  Goats : [ {type:String}]
  
});

module.exports = mongoose.model("Baneficial", BaneficialSchema);

