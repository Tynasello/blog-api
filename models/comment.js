const format = require("date-fns/format");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*------------------------------------------------------------*/

// Comment Schema
const CommentSchema = new Schema({
  text: { type: String, required: true },
  author_name: { type: String, required: true },
  parent_post_id: { type: String, required: true },
  date: { type: String, default: format(Date.now(), "MMMM dd, yyyy") },
});

/*------------------------------------------------------------*/

module.exports = mongoose.model("Comment", CommentSchema);
