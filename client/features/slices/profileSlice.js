import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileImageUrl: null,
    email: "",
  },
  reducers: {
    setProfileImageUrl: (state, action) => {
      state.profileImageUrl = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setProfileImageUrl, setEmail } = profileSlice.actions;

export const selectProfileImageUrl = (state) => state.profile.profileImageUrl;
export const selectEmail = (state) => state.profile.email;

export default profileSlice.reducer;
