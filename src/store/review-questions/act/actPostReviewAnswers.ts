
import { TEnteredData } from "@/components/review-form/ReviewForm";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actPostReviewAnswers = createAsyncThunk(
  "review-questions/actPostReviewAnswers",
  async (
    data: {
      lesson: number | undefined;
      questions: TEnteredData[];
      token: string | undefined;
    },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/dashboard/review_answer/";
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${data.token}`,
        },
      };

      await axios.post(url, data, config);
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actPostReviewAnswers;
