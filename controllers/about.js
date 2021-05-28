const About = require("../models/about");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newAbout = await new About(req.body).save();
    res.json(newAbout);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create About failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

// populate yapmazsak mesela About partindaki bilgilerin sadece id'si gözükür ama populate yaparsak tüm bilgileri aliriz net bir şekilde
exports.listAll = async (req, res) => {
  let abouts = await About.find({})
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(abouts);
};


exports.remove = async (req, res) => {
  try {
    const deleted = await About.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("About delete failed");
  }
};


exports.read = async (req, res) => {
  const about = await About.findOne({ slug: req.params.slug })
    .exec();
  res.json(about);
};


// req.body demek bütün bilgilerimi update ediyorum demek. About update e göre.
exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await About.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("About UPDATE ERROR ----> ", err);
    // return res.status(400).send("About update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};
