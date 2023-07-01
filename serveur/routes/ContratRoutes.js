const express = require("express");
const {
  getAllContrats,
  createContrat,
  getContratById,
  updateContrat,
  deleteContrat,
} = require("../controllers/ContratController");

const router = express.Router();

router.route("/").get(getAllContrats).post(createContrat);
router.route("/:id").get(getContratById).put(updateContrat).delete(deleteContrat);

module.exports = router;
