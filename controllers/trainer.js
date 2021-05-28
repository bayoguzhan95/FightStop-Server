const Trainer = require("../models/trainer");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newTrainer = await new Trainer(req.body).save();
    res.json(newTrainer);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create Trainer failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

// populate yapmazsak mesela trainer partindaki bilgilerin sadece id'si gözükür ama populate yaparsak tüm bilgileri aliriz net bir şekilde
exports.listAll = async (req, res) => {
  let trainers = await Trainer.find({})
    .limit(parseInt(req.params.count))
    .sort({'createdAt': 1})
    // .sort([["", "desc"]])
    .exec();
  res.json(trainers);
};


exports.remove = async (req, res) => {
  try {
    const deleted = await Trainer.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Trainer delete failed");
  }
};


exports.read = async (req, res) => {
  const trainer = await Trainer.findOne({ slug: req.params.slug })
    .exec();
  res.json(trainer);
};


// req.body demek bütün bilgilerimi update ediyorum demek. trainer update e göre.
exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Trainer.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("Trainer UPDATE ERROR ----> ", err);

    res.status(400).json({
      err: err.message,
    });
  }
};
