import axiosErrorHandler from "@/utils/axiosErrorHandler";
import getBaseUrl from "@/utils/getBaseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actFCMLogout = createAsyncThunk(
  "FCM/actFCMLogin",
  async (
    {
      user_token,
      FCM_token,
    }: { user_token: string | undefined; FCM_token: string },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    // const baseUrl = getBaseUrl();

    try {
      const url =
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/notify/devices/logout/";
      const config = {
        headers: {
          Authorization: `Token ${user_token}`,
        },
      };
      const data = {
        registration_id: FCM_token,
        type: "web",
      };

      await axios.post(url, data, config);
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actFCMLogout;
