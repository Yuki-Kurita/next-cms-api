const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const tagSchema = new Schema(
  {
    tagName: {
      type: String,
      required: true,
      unique: true,
      minlength: [1, "Input tag name"],
      maxlength: [20, "Input less than 20 words"]
    }
  }
);

module.exports = mongoose.model("Tag", tagSchema);