const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
      maxlength: 2500,
      text: true,
    },

    specialTitle: {
      type: String,
      maxlength: 100,
      text: true,
    },
    specialItem: {
      type: String,
    },

    images: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trainer', trainerSchema);
