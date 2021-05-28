const Home = require("../models/home");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newHome = await new Home(req.body).save();
    res.json(newHome);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create Home failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

// populate yapmazsak mesela Home partindaki bilgilerin sadece id'si gözükür ama populate yaparsak tüm bilgileri aliriz net bir şekilde
// WİTHOUT PAGİNATİON
exports.listAll = async (req, res) => {
  let homes = await Home.find({})
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(homes);
};







exports.remove = async (req, res) => {
  try {
    const deleted = await Home.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Home delete failed");
  }
};


exports.read = async (req, res) => {
  const home = await Home.findOne({ slug: req.params.slug })
    .exec();
  res.json(home);
};


// req.body demek bütün bilgilerimi update ediyorum demek. Home update e göre.
exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Home.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("Home UPDATE ERROR ----> ", err);

    res.status(400).json({
      err: err.message,
    });
  }
};


exports.list = async (req, res) => {
  // console.table(req.body);
  try {
    // createdAt/updatedAt, desc/asc, 3
    const {sort , order ,page } = req.body;
    const currentPage = page || 1;
    const perPage = 9; // 3

    const homes = await Home.find({})
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(homes);
  } catch (err) {
    console.log(err);
  }
};


exports.homesCount = async (req, res) => {
  let total = await Home.find({}).estimatedDocumentCount().exec();
  res.json(total);
};
