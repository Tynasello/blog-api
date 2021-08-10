const async = require("async");

const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

/*--------------------------------------------------------------*/

exports.get_post_comments = async function (req, res, next) {
  try {
    const comments = await Comment.find({});
    const post_comments = comments.filter(
      (comment) => comment.parent_post_id === req.params.postid
    );
    if (!post_comments) {
      return res
        .status(404)
        .json({ errors: [{ message: `post comments not found` }] });
    }
    res.status(200).json({ post_comments });
  } catch (err) {
    next(err);
  }
};

/*--------------------------------------------------------------*/

exports.get_post_comment = async function (req, res, next) {
  try {
    const comment = await Comment.findById(req.params.commentid);
    if (comment == null) {
      return res
        .status(404)
        .json({ errors: [{ message: `comment not found` }] });
    }
    res.status(200).json({ comment });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

/*--------------------------------------------------------------*/

exports.create_post_comment = [
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
    const { text, author_name } = req.body;
    const parent_post_id = req.params.postid;

    const comment = new Comment({
      text,
      author_name,
      parent_post_id,
    });
    comment.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "comment sent" });
    });
  },
];

/*--------------------------------------------------------------*/

exports.delete_post_comment = async function (req, res, next) {
  try {
    const comment = await Comment.findById(req.params.commentid);
    if (comment == null) {
      return res
        .status(404)
        .json({ errors: [{ message: `comment not found` }] });
    }
    await comment.remove();
    res.json({ message: "Deleted Comment" });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

/*--------------------------------------------------------------*/

exports.delete_post_comments = async function (req, res, next) {
  try {
    const comment = await Comment.deleteMany({
      // Only delete comments whose parent post id matches current route postid
      parent_post_id: req.params.postid,
    });
    if (comment == null) {
      return res
        .status(404)
        .json({ errors: [{ message: `no comments found` }] });
    }
    res.json({ message: "All Post Comment Deleted" });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

/*--------------------------------------------------------------*/

exports.update_post_comment = [
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
    try {
      const { text, author_name } = req.body;
      const comment = await Comment.findByIdAndUpdate(req.params.commentid, {
        text,
        author_name,
      });
      if (comment == null) {
        return res
          .status(404)
          .json({ errors: [{ message: `comment not found` }] });
      }
      return res.status(200).json({ message: "updated sucessfuly" });
    } catch (err) {
      res.status(500).json({ errors: [{ message: err.message }] });
    }
  },
];

/*--------------------------------------------------------------*/
