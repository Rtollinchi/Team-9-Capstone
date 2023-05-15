import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setProfileImageURL,
  setEmail,
  setProfileImageUrl,
} from "../slices/profileSlice";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    dispatch(setProfileImageUrl(selectedImage));
    dispatch(setEmail(email));
    // Logic to upload the selected image and email goes here
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <form>
        <input
          type="file"
          id="profile-image"
          name="profile-image"
          accept="image/*"
          onChange={handleFileSelect}
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <button type="button" onClick={handleUpload}>
          Upload
        </button>
      </form>
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected Profile" />
        </div>
      )}
    </div>
  );
};

export default Profile;
