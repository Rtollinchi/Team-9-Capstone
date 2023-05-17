import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../slices/profileSlice";
import { fetchUserImage } from "../slices/profileSlice";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  // const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const profileImageUrl = useSelector((state) => state.profile.profileImageUrl);

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
  useEffect(() => {
    dispatch(fetchUserImage());
  }, [dispatch]);

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

        <button type="button" onClick={handleUpload}>
          Upload
        </button>
      </form>
      {profileImageUrl && (
        <div>
          <img
            src={profileImageUrl}
            alt="Profile Image"
            className="w-16 h-16 rounded-full my-4"
          />
        </div>
      )}
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
