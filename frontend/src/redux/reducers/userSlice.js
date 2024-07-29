import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStarted: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    signInFailed: (state) => {
      state.loading = false;
    },
  },
});

export const { signInStarted, signInSuccess, signInFailed } = userSlice.actions;

export default userSlice.reducer;
