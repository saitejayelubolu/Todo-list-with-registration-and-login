const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    minLength: [1, "Name must be 1 or more"],
    maxlength: [10, "Name can't exceed 10 characters"],
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["male", "female"],
  },
  password: {
    type: String,
    minLength: [6, "Password must be 6 or more"],
    required: [true, "Password is required"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
