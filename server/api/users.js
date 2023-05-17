const router = require("express").Router();

const fs = require("fs");
const path = require("path");
const {
  models: { User },
} = require("../db");
const { requireToken } = require("./gatekeepingmiddleware");

router.get("/", requireToken, async (req, res, next) => {
  const user = req.user;
  const userId = user.id;
  try {
    const userData = await User.findOne({ where: { id: userId } });
    if (userData) {
      const { avatarUrl } = userData.dataValues;
      console.log("avatarurl", avatarUrl);
      const imageUrl = `/uploads/${avatarUrl}`;
      console.log(imageUrl);
      res.json(imageUrl);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/uploadImage", requireToken, (req, res) => {
  const user = req.user;
  const userId = user.id;
  const userName = user.username;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;

  // Generate a unique filename for the image using the user's ID
  const fileName = `${userId}-${userName}${path.extname(file.name)}`;

  // Define the path where the image will be stored
  const filePath = path.join(__dirname, "../../uploads", fileName);
  console.log(filePath);
  // Move the file to the desired location
  file.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Update the user's profile image in the database
    User.update({ avatarUrl: fileName }, { where: { id: userId } })
      .then(() => {
        res.send(filePath);
      })
      .catch((error) => {
        // If there is an error updating the user's profile image in the database,
        // you may want to delete the uploaded file to maintain consistency.
        fs.unlinkSync(filePath);
        res.status(500).send("Error updating profile image.");
      });
  });
});

module.exports = router;
