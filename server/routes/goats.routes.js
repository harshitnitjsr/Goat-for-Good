const express = require("express");
const { addGoats, findgoats } = require("../controllers/goat.controller");
const router = express.Router();
router.post("/add", addGoats);
router.get("/findgoat", findgoats);
module.exports = router;
