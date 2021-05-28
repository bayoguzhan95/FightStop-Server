const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
} = require("../controllers/training");

// routes
router.post("/training", authCheck, adminCheck, create);
router.get("/trainings/:count", listAll); // products/100
router.delete("/training/:slug", authCheck, adminCheck, remove);
router.get("/training/:slug", read);
router.put("/training/:slug", authCheck, adminCheck, update);

module.exports = router;
