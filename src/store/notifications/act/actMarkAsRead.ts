import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actMarkAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (
    {
      token,
      notification_id,
    }: { token: string | undefined; notification_id: number },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const url =
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/notify/notification/";
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          notification_id,
        },
      };

      const response = await axios.get(url, config);
      console.log(response.data);
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actMarkAsRead;
