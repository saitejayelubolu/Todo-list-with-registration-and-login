const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    unique: true,
    minLength: [3, "Title must be 1 or more"],
    required: [true, "Title is required"],
  },
  description: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["inprogress", "completed"],
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
