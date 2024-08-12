import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TUserProfileResponse = {
  user: {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    image: string,
    gender: string,
    birth_date: string,
    date_joined: string,
    message: string,
    status: number
  }
}

const actGetUserProfile = createAsyncThunk(
  "profile/actGetUserProfile",
  async (token: string | undefined, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/user/profile/";
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      const response = await axios.get<TUserProfileResponse>(url, config);      
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetUserProfile;
