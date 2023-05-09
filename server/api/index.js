const User = require("../db/models/User");

const router = require("express").Router();
module.exports = router;

// o: some sample to get req.user set on every request (please test before
//  adding)
// const authorize = async (req, res, next) => {
//   try {
//     if (!req.headers.authorization) {
//       return next();
//     }
//     const user = await User.findByToken(req.headers.authorization);
//     console.log("authorize", user);
//     if (user) {
//       req.user = user;
//       next();
//     } else {
//       next(new Error("User not found"));
//     }
//   } catch (error) {
//     next(error);
//   }
// };
// const authorize = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     console.log("token", token);
//     const user = await User.findByToken(token);
//     req.user = user;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };
// router.use(authorize);

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
