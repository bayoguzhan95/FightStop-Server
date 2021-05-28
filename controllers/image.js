const Image = require("../models/image");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newImage = await new Image(req.body).save();
    res.json(newImage);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create Image failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

// populate yapmazsak mesela Image partindaki bilgilerin sadece id'si gözükür ama populate yaparsak tüm bilgileri aliriz net bir şekilde
// WİTHOUT PAGİNATİON
exports.listAll = async (req, res) => {
  let images = await Image.find({})
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(images);
};







exports.remove = async (req, res) => {
  try {
    const deleted = await Image.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Image delete failed");
  }
};


exports.read = async (req, res) => {
  const image = await Image.findOne({ slug: req.params.slug })
    .exec();
  res.json(image);
};


// req.body demek bütün bilgilerimi update ediyorum demek. Image update e göre.
exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Image.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("Image UPDATE ERROR ----> ", err);

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

    const images = await Image.find({})
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(images);
  } catch (err) {
    console.log(err);
  }
};


exports.imagesCount = async (req, res) => {
  let total = await Image.find({}).estimatedDocumentCount().exec();
  res.json(total);
};
