import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileImage: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

// Export the reducer and actions
export const { setProfileImage } = profileSlice.actions;

// Define the selector to retrieve the profile image
export const selectProfileImage = (state) => state.profile.profileImage;

// Export the profile reducer
export default profileSlice.reducer;
