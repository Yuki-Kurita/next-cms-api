const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [1, "Input title"],
      maxlength: [100, "Input less than 100 words"]
    },
    content: {
      type: String,
      required: true,
      minlength: [1, "Input content"]
    },
    tagId: {
      type: Number,
      required: [true, "Need tags"]
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    },
    deleteFlag: {
      type: Boolean,
      default: false
    }
  }
)

module.exports = mongoose.model("Article", articleSchema);
