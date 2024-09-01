import { TUser, TUserStatistics } from "@/types/User";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TUserProfileResponse = {
  user: TUser,
  statistics: TUserStatistics
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
