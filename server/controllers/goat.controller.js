const Goat = require("../models/goat.model");
const addGoats = async (req, res) => {
  try {
    // Extract data from req.body
    const {
      ben_id,
      health,
      isAlive,
      gender,
      currentWeight,
      weight,
      breed,
      year_of_birth,
      isPregnant,
      date,
      tagId,
    } = req.body;

    // Create a new goat object
    const newGoat = new Goat({
      ben_id,
      health,
      isAlive,
      gender,
      currentWeight,
      weightArray: [
        {
          weight,
          date,
        },
      ],
      breed,
      year_of_birth,
      isPregnant,
      tagId,
    });
    // Save the new goat object to the database
    const savedGoat = await newGoat.save();
    res.status(201).json(savedGoat); // Respond with the saved goat object
  } catch (error) {
    console.error("Error adding new goat:", error);
    res.status(500).json({ error: "Failed to add new goat" }); // Handle error
  }
};

const findgoats = async (req, res) => {
  try {
    const goats = await Goat.find();

    res.status(201).json(goats); // Respond with the saved goat object
  } catch (error) {
    console.error("Error finding  goat:", error);
    res.status(500).json({ error: "Failed to find  goat" }); // Handle error
  }
};

module.exports = { addGoats, findgoats };
