import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setProfileImageUrl, setEmail } from "../slices/profileSlice";
import { ProfileImage } from "../slices/profileSlice";

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
    dispatch(setProfileImageUrl(selectedImage));
    // Logic to upload the selected image goes here
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Upload</button>
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
