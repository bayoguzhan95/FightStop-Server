const mongoose = require("mongoose");


const homesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    images: {
      type: Array,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Home", homesSchema);
