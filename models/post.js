const format = require("date-fns/format");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*------------------------------------------------------------*/

// Post Schema
const PostSchema = new Schema({
  title: { type: String, required: true },
  author_name: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, default: format(Date.now(), "MMMM dd, yyyy") },
});

/*------------------------------------------------------------*/

module.exports = mongoose.model("Post", PostSchema);
