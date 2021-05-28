const Training = require("../models/training");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newTraining = await new Training(req.body).save();
    res.json(newTraining);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create Training failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

// populate yapmazsak mesela trainer partindaki bilgilerin sadece id'si gözükür ama populate yaparsak tüm bilgileri aliriz net bir şekilde
exports.listAll = async (req, res) => {
  let trainings = await Training.find({})
    .limit(parseInt(req.params.count))
    .sort({'title': 1})
    .exec();
  res.json(trainings);
};


exports.remove = async (req, res) => {
  try {
    const deleted = await Training.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Training delete failed");
  }
};


exports.read = async (req, res) => {
  const training = await Training.findOne({ slug: req.params.slug })
    .exec();
  res.json(training);
};


// req.body demek bütün bilgilerimi update ediyorum demek. trainer update e göre.
exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Training.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("trainings UPDATE ERROR ----> ", err);
    // return res.status(400).send("trainings update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};
