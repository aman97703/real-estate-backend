const User = require("../models/user.model");
const errorHandler = require("./error");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, async(err, data) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    const user = await User.findById(data.id);
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
