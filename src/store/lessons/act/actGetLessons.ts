import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  TAdminResponse,
  TStudentResponse,
  TFamilyResponse,
  TTeacherResponse,
} from "@/validations";

type TLessonsResponse =
  | TAdminResponse
  | TStudentResponse
  | TFamilyResponse
  | TTeacherResponse;

const actGetLessons = createAsyncThunk('lessons/actGetLessons', async (token: string, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const url = 'https://elmadrasah-development-ff14bf466889.herokuapp.com/dashboard/lesson/';
    const config = {
      headers: {
        'Authorization': `Token ${token}`
      }
    };
    const response = await axios.get<TLessonsResponse>(url, config);
    console.log(response.data)
    return response.data
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

export default actGetLessons