import { createSlice } from "@reduxjs/toolkit";
import actAuthLogin from "./act/actAuthLogin";
import actGoogleLogin from "./act/actGoogleLogin";
import { isString } from "@/types/gurads";
import { TLoading, TUserRole } from "@/types/shared";
import actSetPassword from "./act/actSetPassword";
type TAuthState = {
  user: {
    id?: number;
    email: string;
    phone?: string;
    first_name: string;
    last_name: string;
    token?: string;
    user_type?: TUserRole;
  } | null;
  loading: TLoading;
  error: string | null;
  modified_email?: string;
};

const initialState: TAuthState = {
  user: null,
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    // Regular Login
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload.user;
      state.modified_email = action.payload.modified_email;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Google Login
    builder.addCase(actGoogleLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGoogleLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = {
        email: action.payload.email,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        token: action.payload.token,
        phone: action.payload.phone,
        user_type: action.payload.user_type,
      };
    });
    builder.addCase(actGoogleLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Set New_Password
    builder.addCase(actSetPassword.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actSetPassword.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload.user;
    });
    builder.addCase(actSetPassword.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },

});

export const { logout } = authSlice.actions;

export { actAuthLogin, actGoogleLogin, actSetPassword };

export default authSlice.reducer;
