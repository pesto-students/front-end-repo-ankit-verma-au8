import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginUserDetails } from "@/types";
import { loginUser, logoutUser } from "@/api";
import { RootState } from "@/store";

interface UserState {
  // userNumber: number | null;
  // userName: string | null;
  userId: number | null;
  authToken: string | null;
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: UserState = {
  // userNumber: null,
  // userName: null,
  userId: null,
  authToken: null,
  loading: false,
  error: undefined,
  success: false,
};

const login = createAsyncThunk(
  "auth/loginUser",
  async (userData: LoginUserDetails, { rejectWithValue }) => {
    try {
      const data = await loginUser(userData);
      return data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }

      let { message, errors } = err.response.data;
      return rejectWithValue(message ?? errors);
    }
  }
);

const logout = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const data = await logoutUser();
    return data;
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.authToken = action.payload.authToken;
      state.userId = action.payload.userId;

      state.loading = false;
      state.error = undefined;
      state.success = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.success = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.authToken = initialState.authToken;
      state.userId = initialState.userId;

      state.loading = false;
      state.error = undefined;
      state.success = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export const { actions: authActions } = authSlice;
export { login as loginUser, logout as logoutUser };

export const isUserLoggedIn = (state: RootState) =>
  !!(state.auth.authToken && state.auth.userId);

export default authSlice.reducer;
