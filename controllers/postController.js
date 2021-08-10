// const Post = require("../models/Post");
// const { body, validationResult } = require("express-validator");

// /*--------------------------------------------------------------*/

// exports.get_blog_posts = async function (req, res, next) {
//   try {
//     const posts = await Post.find({});
//     if (!posts) {
//       return res.status(404).json({ err: "posts not found" });
//     }
//     res.status(200).json({ posts });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /*--------------------------------------------------------------*/

// exports.get_blog_post = async function (req, res, next) {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post == null) {
//       return res.status(404).json({ errors: [{ message: `post not found` }] });
//     }
//     res.status(200).json({ post });
//   } catch (err) {
//     res.status(500).json({ errors: [{ message: err.message }] });
//   }
// };

// /*--------------------------------------------------------------*/

// exports.create_blog_post = [
//   body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
//   body("author_name", "Author must not be empty")
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),

//   //   Process request after validation and sanitization.

//   (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       res.json({
//         errors: errors.array(),
//       });
//       return;
//     }
//     const { title, author_name, text } = req.body;
//     const post = new Post({
//       title,
//       author_name,
//       text,
//     });
//     post.save((err) => {
//       if (err) {
//         return next(err);
//       }
//       res.status(200).json({ message: "post sent" });
//     });
//   },
// ];

// /*--------------------------------------------------------------*/

// exports.delete_blog_post = async function (req, res, next) {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post == null) {
//       return res.status(404).json({ errors: [{ message: `post not found` }] });
//     }
//     await post.remove();
//     res.json({ message: "Deleted Post" });
//   } catch (err) {
//     res.status(500).json({ errors: [{ message: err.message }] });
//   }
// };

// /*--------------------------------------------------------------*/

// exports.update_blog_post = [
//   body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
//   body("author_name", "Author must not be empty")
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),

//   //   Process update request after validation and sanitization.

//   async (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       res.json({
//         errors: errors.array(),
//       });
//       return;
//     }
//     try {
//       const { title, author_name, text } = req.body;
//       const post = await Post.findByIdAndUpdate(req.params.id, {
//         title,
//         author_name,
//         text,
//       });
//       if (post == null) {
//         return res
//           .status(404)
//           .json({ errors: [{ message: `post not found` }] });
//       }
//       return res.status(200).json({ message: "updated sucessfuly" });
//     } catch (err) {
//       res.status(500).json({ errors: [{ message: err.message }] });
//     }
//   },
// ];

// /*--------------------------------------------------------------*/
