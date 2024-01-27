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

export const userSlice = createSlice({
  name: "user",
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

export default userSlice.reducer;
