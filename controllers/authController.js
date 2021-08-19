/*--------------------------------------------------------------*/

require("dotenv").config();
const async = require("async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

/*--------------------------------------------------------------*/

// Sign up
exports.sign_up = async function (req, res, next) {
  // Send JSON response with error message if password or username was not passed in
  if (!req.body.password || !req.body.username) {
    return res.status(400).json({
      errors: [{ message: "Please enter a valid username and password" }],
    });
  }
  // Has password using default salt
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    // Create new user from User model using request username and hashed password
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    }).save((err) => {
      // Save user in db
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
};

/*--------------------------------------------------------------*/

// Log in
exports.log_in = async function (req, res, next) {
  // Send JSON response with error message if password or username was not passed in
  if (!req.body.password || !req.body.username) {
    return res.status(400).json({
      errors: [{ message: "Please enter a valid username and password" }],
    });
  }
  // Authenticate user

  // Check if account exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ auth: false, message: "No user exists" });
  }
  // User was found
  // Authenticate password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).json({ auth: false, message: "Incorrect password" });
  }
  // Passwords match -> log user in
  // Create and assign json web token
  const accessToken = jwt.sign(
    { _id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    // JWT expires in a day
    { expiresIn: 3600 }
  );
  res.status(200).json({
    auth: true,
    token: accessToken,
    user,
    message: "Successfully logged in",
  });
};

/*--------------------------------------------------------------*/

// Log out
exports.log_out = function (req, res) {
  // Call request logout function
  req.logout();
  res.status(200).json({ message: "successfully logged out" });
};

/*--------------------------------------------------------------*/

// Get user by token
exports.get_user = async function (req, res) {
  // Find user by if in db
  // Remove password from user in db
  const user = await User.findById(req.user._id).select("-password");
  // Send JSON response with user
  res.json(user);
};

/*--------------------------------------------------------------*/
