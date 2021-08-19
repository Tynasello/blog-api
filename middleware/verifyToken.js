/*------------------------------------------------------------
Middleware function for verifying JSON web token
------------------------------------------------------------*/

const jwt = require("jsonwebtoken");

/*------------------------------------------------------------*/

module.exports = function (req, res, next) {
  // Get x-access-token header from request headers
  const token = req.headers["x-access-token"];
  // If there is no token user is not authorized
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  // Verify JWT using secret access token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid Token");
    req.user = user;
    next();
  });
};

/*------------------------------------------------------------*/
