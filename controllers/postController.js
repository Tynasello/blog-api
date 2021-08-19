/*--------------------------------------------------------------*/

const async = require("async");
const { body, validationResult } = require("express-validator");

const Post = require("../models/post");

/*--------------------------------------------------------------*/

// Get all blog posts
exports.get_blog_posts = async function (req, res, next) {
  try {
    // Find all posts and send JSON response
    const posts = await Post.find();
    if (!posts) {
      return res.status(404).json({ err: "posts not found" });
    }
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*--------------------------------------------------------------*/

// Get single blog post by id
exports.get_blog_post = async function (req, res, next) {
  try {
    // Find post by id and send JSON response
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "post not found" });
    }
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*--------------------------------------------------------------*/

// Create blog post
exports.create_blog_post = [
  // Title and author name must not be empty
  body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("author_name", "Author must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
      });
      return;
    }
    // If request is valid
    // Get request fields and create new post using Post model
    const { title, author_name, text } = req.body;
    const post = new Post({
      title,
      author_name,
      text,
    });
    // Save post in db
    post.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "post sent" });
    });
  },
];

/*--------------------------------------------------------------*/

// Delete blog post by id
exports.delete_blog_post = async function (req, res, next) {
  try {
    // Find post by id
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "post not found" });
    }
    // If post is found remove it from the db
    await post.remove();
    res.status(200).json({ message: "Post has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*--------------------------------------------------------------*/

// Update blog post by id

exports.update_blog_post = [
  // Title and author name must not be empty
  body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("author_name", "Author must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  //   Process update request after validation and sanitization.

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }

    // If request is valid
    // Get request fields and update existing post in db with values of said field
    try {
      const { title, author_name, text } = req.body;
      const post = await Post.findByIdAndUpdate(req.params.id, {
        title,
        author_name,
        text,
      });
      if (post == null) {
        return res.status(404).json({ message: "post not found" });
      }
      return res.status(200).json({ message: "updated sucessfuly" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
];

/*--------------------------------------------------------------*/
