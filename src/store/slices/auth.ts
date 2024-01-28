import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  userNumber: number | null;
  userName: string | null;
  authToken: string | null;
}

const initialState: UserState = {
  userNumber: null,
  userName: null,
  authToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      let user = action.payload;
      state = user;
    },
    logoutUser: (state) => {
      state = { ...initialState };
    },
  },
});

export default authSlice.reducer;
