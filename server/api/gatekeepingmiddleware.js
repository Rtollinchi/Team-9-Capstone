const jwt = require("jsonwebtoken");
const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user) {
      req.user = user;
      next();
    } else {
      next(new Error("error"));
    }
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

module.exports = { requireToken };
