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
} = require("../controllers/trainer");

// routes
router.post("/trainer", authCheck, adminCheck, create);
router.get("/trainers/:count", listAll); // products/100
router.delete("/trainer/:slug", authCheck, adminCheck, remove);
router.get("/trainer/:slug", read);
router.put("/trainer/:slug", authCheck, adminCheck, update);

module.exports = router;
