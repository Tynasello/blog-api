/*--------------------------------------------------------------*/

const async = require("async");
const { body, validationResult } = require("express-validator");

const Comment = require("../models/comment");

/*--------------------------------------------------------------*/

// Get all post comments by parenting post id
exports.get_post_comments = async function (req, res, next) {
  try {
    // Find all coments in db and filter by requested parenting post id
    const comments = await Comment.find({});
    const post_comments = comments.filter(
      (comment) => comment.parent_post_id === req.params.postid
    );
    if (!post_comments) {
      return res.status(404).json({ message: "post comments not found" });
    }
    // Send JSON response of all post comments
    res.status(200).json({ post_comments });
  } catch (err) {
    next(err);
  }
};

/*--------------------------------------------------------------*/

// Get post comment by id of post of parenting post id
exports.get_post_comment = async function (req, res, next) {
  try {
    // Find comment by id in db
    const comment = await Comment.findById(req.params.commentid);
    if (comment == null) {
      return res.status(404).json({ message: `comment not found` });
    }
    // Send JSON response of post comment
    res.status(200).json({ comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*--------------------------------------------------------------*/

// Create post comment for post of parenting post id
exports.create_post_comment = [
  // text and author name must not be empty
  body("text", "comment text must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author_name", "Author must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  //   Process request after validation and sanitization.

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
      });
      return;
    }
    // If request is valid
    // Get request fields and create new comment using Comment model
    const { text, author_name } = req.body;
    const parent_post_id = req.params.postid;

    const comment = new Comment({
      text,
      author_name,
      parent_post_id,
    });
    // Save comment in db
    comment.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "comment sent" });
    });
  },
];

/*--------------------------------------------------------------*/

// Delete post comment for post of parenting post id
exports.delete_post_comment = async function (req, res, next) {
  try {
    // Find comment in db by comment id
    const comment = await Comment.findById(req.params.commentid);
    if (comment == null) {
      return res.status(404).json({ message: `comment not found` });
    }
    // Remove comment from db
    await comment.remove();
    res.json({ message: "Deleted Comment" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*--------------------------------------------------------------*/

// Delete all post comments of post of parenting post id
exports.delete_post_comments = async function (req, res, next) {
  try {
    // Delete all comments in db matching parenting post id
    const comment = await Comment.deleteMany({
      // Only delete comments whose parent post id matches current route postid
      parent_post_id: req.params.postid,
    });
    if (comment == null) {
      return res.status(404).json({ message: `no comments found` });
    }
    res.json({ message: "All Post Comments Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*--------------------------------------------------------------*/

// Update post comment by id of post of parent post id
exports.update_post_comment = [
  // Text and author name must not be empty
  body("text", "comment text must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author_name", "Author must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  //   Process update request after validation and sanitization.

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
      });
      return;
    }
    // If request is valid
    // Get request fields and update existing comment by id in db with values of said field
    try {
      const { text, author_name } = req.body;
      const comment = await Comment.findByIdAndUpdate(req.params.commentid, {
        text,
        author_name,
      });
      if (comment == null) {
        return res.status(404).json({ message: `comment not found` });
      }
      return res.status(200).json({ message: "updated sucessfuly" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
];

/*--------------------------------------------------------------*/
