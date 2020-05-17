const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, //for white spaces
      minlength: 3
    },
    email: {
      //************* */
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 3
    },
    role: { type: String, required: false }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
