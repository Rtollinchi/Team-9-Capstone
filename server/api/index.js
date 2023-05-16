// server/api/index.js

// Import the necessary modules and models
const router = require("express").Router();
const User = require("../db/models/User");

// Middleware to set req.user on every request
router.use((req, res, next) => {
  // Get the user ID from the request (assuming it's stored in req.userId)
  const userId = req.userId;

  // Fetch the user from the database
  User.findByPk(userId)
    .then((user) => {
      if (user) {
        // Set req.user to the fetched user object
        req.user = user;
      }
      next();
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      next(error);
    });
});

// Mount your other route handlers
router.use("/users", require("./users"));
router.use("/tasks", require("./tasks"));
router.use("/subTasks", require("./subTasks"));

// 404 handler
router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
