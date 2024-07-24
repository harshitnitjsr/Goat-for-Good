const express = require("express");
const router = express.Router();
const {
  createParavat,
  findParavat,
  incrementAssignments,
  incrementCompletedAssignments
} = require("../controllers/paravat.controller.js");
router.post("/add", createParavat);
router.get("/find", findParavat);
router.patch('/:userId/incrementAssignments', incrementAssignments);
router.patch('/:userId/incrementCompletedAssignments', incrementCompletedAssignments);
module.exports = router;
