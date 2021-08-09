const User = require("../models/user");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcrypt");

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
      res.redirect("/users/log-in");
    });
  });
};

/*--------------------------------------------------------------*/
// Log in

exports.log_in = async function (req, res, next) {
  // Authenticate user
  User.findOne({ username: req.body.username }, (err, user) => {
    if (!user) {
      return res.status(404).json({ errors: [{ message: `User not found` }] });
    }
    if (
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          // passwords match! log user in
          return res.status(200).json("Log in successful");
        } else {
          // passwords do not match!
          return res
            .status(404)
            .json({ errors: [{ message: `Incorrect Password` }] });
        }
      })
    )
      return res.status(200).json("Log in successful");
  });
};

/*--------------------------------------------------------------*/
// Log out

exports.log_out = function (req, res) {
  req.logout();
  res.redirect("/");
};
