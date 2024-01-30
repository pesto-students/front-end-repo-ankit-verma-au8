import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupUser } from "@/api";
import { SignupUserDetails } from "@/types";

interface UserState {
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: UserState = {
  loading: false,
  error: undefined,
  success: false,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData: SignupUserDetails, { rejectWithValue }) => {
    try {
      const data = await signupUser(userData);
      return data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data.message);
    }
  }
);

// const deleteUser = createAsyncThunk("user/deleteUser", async (userData) => {
//   const { data } = await signupUser(userData);
//   return data;
// });

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.success = false;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
        state.error = undefined;
        state.success = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
    //   .addCase(deleteUser.fulfilled, (state) => {
    //     // Handle successful deletion actions
    //   })
    //   .addCase(deleteUser.rejected, (state, action) => {
    //     // Handle delete errors
    //   });
  },
});

export const { actions: userActions } = userSlice;

export default userSlice.reducer;
