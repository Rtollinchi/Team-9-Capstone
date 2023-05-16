const router = require("express").Router();
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const {
  models: { User },
} = require("../db");
const { requireToken } = require("./gatekeepingmiddleware");
router.use(fileUpload());

router.put("/upload-image", requireToken, (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const user = req.user;
  const userId = user.id;

  const file = req.files.file;

  // Generate a unique filename for the image using the user's ID
  const fileName = `${userId}-${Date.now()}-${file.name}`;

  // Define the path where the image will be stored
  const filePath = path.join(__dirname, "../uploads", fileName);

  // Move the file to the desired location
  file.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Update the user's profile image in the database
    User.update({ profileImage: fileName }, { where: { id: userId } })
      .then(() => {
        res.send("File uploaded successfully.");
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
// const express = require('express');

// const app = express();
