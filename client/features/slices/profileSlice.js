// profileSlice.js

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

export const { setProfileImage } = profileSlice.actions;

export const selectProfileImage = (state) => state.profile.profileImage;

export default profileSlice.reducer;
