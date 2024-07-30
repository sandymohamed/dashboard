import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TGoogleLoginResponse = {
  email: string;
  first_name: string;
  key: string;
  last_name: string;
  message: string;
  phone: string;
  token: string;
};

const actGoogleLogin = createAsyncThunk(
  "auth/actGoogleLogin",
  async (credential: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post<TGoogleLoginResponse>(
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/user/api/auth/google/",
        {
          access_token: credential,
          id_token: credential,
        }
      );
      console.log("google login response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGoogleLogin;
