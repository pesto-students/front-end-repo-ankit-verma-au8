import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginUserDetails } from "@/types";
import { loginUser } from "@/api";
import { RootState } from "@/store";
import { setCookie, getCookie } from "@/utils";

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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => {
      setCookie("auth", "", true);
      setCookie("user-id", "", true);
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

      setCookie("auth", action.payload.authToken);
      setCookie("user-id", action.payload.userId);

      state.loading = false;
      state.error = undefined;
      state.success = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export const { actions: authActions } = authSlice;
export { login as loginUser };

export const isUserLoggedIn = (state: RootState) => {
  let cookieAuthToken = getCookie("auth");
  let cookieUserId = getCookie("user-id");

  let authToken = state.auth.authToken || cookieAuthToken;
  let userId = state.auth.userId || cookieUserId;

  return !!(authToken && userId);
};

export default authSlice.reducer;
