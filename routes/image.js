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
  imagesCount,
  list
} = require("../controllers/image");

// routes mesela 2. get requesti en asagi koyunca calismiyor dikkat et. nedeni bilmiyorum
router.post("/image", authCheck, adminCheck, create);
router.get('/images/total', imagesCount)
router.get("/images/:count", listAll); // products/100
router.delete("/image/:slug", authCheck, adminCheck, remove);
router.get("/image/:slug", read);
router.put("/image/:slug", authCheck, adminCheck, update);

router.post("/images", list);



module.exports = router;
