


const express = require("express");
const { createBanef, FindBaneficial ,   addGoatToBeneficiary} = require("../controllers/benef.controller");
const router = express.Router();

router.post("/add", createBanef);
router.get("/all", FindBaneficial);
router.post("/addgoat",addGoatToBeneficiary)

module.exports = router;