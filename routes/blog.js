const express = require("express");

const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const auth_controller = require("../controllers/authController");
const router = express.Router();

/*----------------------------------------------------------------

ROUTES

----------------------------------------------------------------*/

// Always redirect to /posts
router.get("/", function (req, res, next) {
  res.redirect("/blog/posts");
});

/*----------------------------------------------------------------
Post Routes
----------------------------------------------------------------*/
// Getting all posts

router.get("/posts", post_controller.get_blog_posts);

/*--------------------------------------------------------------*/
// Getting single post
router.get("/posts/:id", post_controller.get_blog_post);

/*--------------------------------------------------------------*/
// Creating post
router.post("/posts", post_controller.create_blog_post);

/*--------------------------------------------------------------*/
// Deleting post
router.delete("/posts/:id", post_controller.delete_blog_post);

/*--------------------------------------------------------------*/
// Updating post
router.patch("/posts/:id", post_controller.update_blog_post);

/*----------------------------------------------------------------
Comment Routes
----------------------------------------------------------------*/

// Getting all comment

router.get("/posts/:postid/comments", comment_controller.get_post_comments);

/*--------------------------------------------------------------*/
// Getting single comment
router.get(
  "/posts/:postid/comments/:commentid",
  comment_controller.get_post_comment
);

/*--------------------------------------------------------------*/
// Creating comment
router.post("/posts/:postid/comments", comment_controller.create_post_comment);

/*--------------------------------------------------------------*/
// Deleting comment
router.delete(
  "/posts/:postid/comments/:commentid",
  comment_controller.delete_post_comment
);

/*--------------------------------------------------------------*/
// Deleting all comments
router.delete(
  "/posts/:postid/comments",
  comment_controller.delete_post_comments
);

/*--------------------------------------------------------------*/
// Updating comment
router.patch(
  "/posts/:postid/comments/:commentid",
  comment_controller.update_post_comment
);

/*----------------------------------------------------------------
User Routes
----------------------------------------------------------------*/
router.post("/sign-up", auth_controller.sign_up);

router.post("/log-in", auth_controller.log_in);

router.get("/users", auth_controller.get_users);

router.get("/logout", auth_controller.log_out);

/*----------------------------------------------------------------
----------------------------------------------------------------*/
module.exports = router;
