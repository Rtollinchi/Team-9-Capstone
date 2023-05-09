const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/tasks", require("./tasks"));
router.use("/subTasks", require("./subTasks"));


async function authorize(req, res, next) {
  try {
    if (req.headers.authorization) {
      const user = await User.findByToken(req.headers.authorization);

      if (user) {
        req.user = user;
      } else {
        return next(new Error("User not found"));
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}
router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
