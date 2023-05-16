import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../slices/profileSlice";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  // const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

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
    console.log(selectedImage);
    if (fileInputRef.current && fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      dispatch(updateProfile(file));
    }
  };

  return (
    <div className="flex flex-col h-screen  px-10">
      <form encType="multipart/form-data">
        <input
          type="file"
          id="profile-image"
          name="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileSelect}
        />
        {/* <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"

          // onChange={handleEmailChange}
        /> */}
        <button type="button" onClick={handleUpload}>
          Upload
        </button>
      </form>
      {selectedImage && (
        <div>
          <img
            src={selectedImage}
            alt="Selected Profile"
            className="w-16 h-16 rounded-full my-4"
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
