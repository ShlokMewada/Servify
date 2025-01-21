import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    user: null,
    userProfile: null,
    orderHistory: null,
  },

  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    addUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    removeUserProfile: (state) => {
      state.userProfile = null;
    },
    addOrderHistory: (state, action) => {
      state.orderHistory = action.payload;
    },
  },
});

export const {
  addUser,
  removeUser,
  addUserProfile,
  removeUserProfile,
  addOrderHistory,
} = userSlice.actions;

export default userSlice.reducer;
