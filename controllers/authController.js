require("dotenv").config();

const User = require("../models/User");

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
    { _id: user._id },
    process.env.ACCESS_TOKEN_SECRET
  );
  res
    .header("auth-token", accessToken)
    .send({ token: accessToken, message: "login sucessful" });
};

/*--------------------------------------------------------------*/
// Log out

exports.log_out = function (req, res) {
  //
};
