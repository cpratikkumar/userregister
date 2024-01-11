const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: { type: String, requied: true },
  dob: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const model = new mongoose.model("userdetails", userSchema);
module.exports = model;
