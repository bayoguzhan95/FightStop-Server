const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const trainingSchema = new mongoose.Schema(
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

    trainer: {
      type: ObjectId,
      ref: "Trainer",
    },

  
    images: {
      type: Array,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Training", trainingSchema);
