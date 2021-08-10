// const { DateTime } = require("luxon");

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const postSchema = new Schema({
//   title: { type: String, required: true },
//   author_name: { type: String, required: true },
//   text: { type: String, required: true },
//   date: { type: Date, default: Date.now() },
//   published: { type: Boolean, default: false },
// });

// postSchema.virtual("formatted_date").get(function () {
//   return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
// });

// const Post = mongoose.model("Post", postSchema);

// module.exports = Post;
