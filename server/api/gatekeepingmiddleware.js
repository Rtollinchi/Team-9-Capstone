const jwt = require("jsonwebtoken");
const { User } = require("../db/models/User");

const requireToken = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("No token provided");
    }
    const { id } = jwt.verify(token);
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("Invalid token");
    }
    req.user = user;
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

module.exports = { requireToken };
