import { TFormValuesWithEmail } from "@/pages/login/SetPassword";
import { TUserRole } from "@/types/shared";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TSetPassword = {
  message: string;
  user: {
    id: number;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    user_type: TUserRole;
    token: string;
  };
};
const actSetPassword = createAsyncThunk(
  "auth/actSetPassword",
  async (formData: TFormValuesWithEmail, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post<TSetPassword>(
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/user/set-password/",
        formData
      );
      console.log("set password response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actSetPassword;
