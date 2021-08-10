const { DateTime } = require("luxon");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, required: true },
  author_name: { type: String, required: true },
  parent_post_id: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

CommentSchema.virtual("formatted_date").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Comment", CommentSchema);
