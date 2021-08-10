const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, min: 4, max: 255 },
  password: { type: String, required: true, max: 1024 },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("User", UserSchema);
