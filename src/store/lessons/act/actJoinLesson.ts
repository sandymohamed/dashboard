import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TJoinLesson = {
  token: string | undefined;
  attendance_link: string;
};

const actJoinLesson = createAsyncThunk(
  "lessons/actJoinLesson",
  async (
    { token, attendance_link }: TJoinLesson,
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let url = attendance_link;
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      }

      const response = await axios.get(url, config);
      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }

);

export default actJoinLesson;
