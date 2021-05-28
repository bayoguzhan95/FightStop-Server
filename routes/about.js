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
} = require("../controllers/about");

// routes
router.post("/about", authCheck, adminCheck, create);
router.get("/abouts/:count", listAll); // products/100
router.delete("/about/:slug", authCheck, adminCheck, remove);
router.get("/about/:slug", read);
router.put("/about/:slug", authCheck, adminCheck, update);

module.exports = router;
