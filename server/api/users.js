const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken } = require("./gatekeepingmiddleware");

// POST /api/users/upload-image - Endpoint to handle image uploads
router.put("/upload-image", requireToken, (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // Get the uploaded file
  const { image } = req.files;
  console.log("image", image);
  // Process the uploaded image
  // Here, you can save the image to a specific directory or perform any other required operations

  // Example: Save the image with a unique filename
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const fileExtension = image.name.split(".").pop();
  const filename = `${uniqueSuffix}.${fileExtension}`;
  const filePath = `public/uploads/${filename}`;

  // Move the file to the desired location
  image.mv(filePath, (error) => {
    if (error) {
      return next(error);
    }

    // Get the user ID from the request
    const user = req.user;
    const userId = user.id;
    console.log("userId", userId);
    // Update the user record with the uploaded image filename
    User.findByPk(userId)
      .then((user) => {
        user.avatarUrl = "/uploads/" + filename;
        return user.save();
      })
      .then(() => {
        res.status(200).send("Image uploaded successfully.");
      })
      .catch((error) => {
        next(error);
      });
  });
});

module.exports = router;
// const express = require('express');
// const fileUpload = require('express-fileupload');

// const app = express();
// app.use(fileUpload());
// app.post('/upload', (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   // The name 'file' should match the name attribute of the input field in the HTML form
//   const file = req.files.file;

//   // Use the mv() method to move the file to the desired location
//   file.mv('./uploads/' + file.name, (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     res.send('File uploaded successfully.');
//   });
// });
