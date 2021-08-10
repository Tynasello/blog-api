const { DateTime } = require("luxon");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  author_name: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  published: { type: Boolean, default: false },
});

PostSchema.virtual("formatted_date").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Post", PostSchema);
