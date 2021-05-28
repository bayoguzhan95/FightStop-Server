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
  homesCount,
  list
} = require("../controllers/home");

// routes mesela 2. get requesti en asagi koyunca calismiyor dikkat et. nedeni bilmiyorum
router.post("/home", authCheck, adminCheck, create);
router.get('/homes/total', homesCount)
router.get("/homes/:count", listAll); // products/100
router.delete("/home/:slug", authCheck, adminCheck, remove);
router.get("/home/:slug", read);
router.put("/home/:slug", authCheck, adminCheck, update);

router.post("/homes", list);



module.exports = router;
