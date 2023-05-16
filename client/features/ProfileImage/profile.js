import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setProfileImageUrl, selectEmail } from "../slices/profileSlice";
import updateProfile from "../slices/profileSlice";

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
    const handleSubmit = async (e) => {
      await e.preventDefault();
      console.log(parentTaskId);

      if (!parentTaskId) {
        dispatch({ title, description, priority, userId, dueDate });
      } else {
        const parentId = parseInt(parentTaskId);
        console.log(parentId);
        dispatch(
          addTasks({ title, description, priority, userId, parentId, dueDate })
        );
      }
      setTitle("");
      setDescription("");
      setPriority("Low");
      setDueDate(new Date());
    };
  };

  const handleUpload = () => {
    dispatch(updateProfile(selectedImage));
    // Logic to upload the selected image goes here
  };
  console.log("image", selectedImage);
  return (
    <div className="flex flex-col h-screen  px-10">
      <form>
        <input
          type="file"
          id="profile-image"
          name="profile-image"
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
