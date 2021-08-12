require("dotenv").config();
const async = require("async");

const User = require("../models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

/*--------------------------------------------------------------*/

exports.get_users = async function (req, res, next) {
  const users = await User.find({});
  res.json({ users });
};

/*--------------------------------------------------------------*/
// Sign up

exports.sign_up = async function (req, res, next) {
  if (!req.body.password || !req.body.username) {
    return res.status(400).json({
      errors: [{ message: `Please enter a valid username and password` }],
    });
  }
  //   const salt = await bcrypt.genSalt();
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    }).save((err) => {
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
  if (!req.body.password || !req.body.username) {
    return res.status(400).json({
      errors: [{ message: `Please enter a valid username and password` }],
    });
  }
  // Authenticate user
  // Check if account exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ errors: [{ message: `User not found` }] });
  }
  // Authenticate password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res
      .status(400)
      .json({ errors: [{ message: `Incorrect Password` }] });
  }
  // passwords match! log user in
  // Create and assign json web token
  const accessToken = jwt.sign(
    // { _id: user._id },
    process.env.ACCESS_TOKEN_SECRET
    // { expiresIn: 3600 }
  );
  res.status(200).json({ auth_token: accessToken, message: "login sucessful" });
};

/*--------------------------------------------------------------*/
// Log out

exports.log_out = function (req, res) {
  res.json("Log out controller");
};

/*--------------------------------------------------------------*/
// Get user by token

exports.get_user = async function (req, res) {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
};

/*--------------------------------------------------------------*/
