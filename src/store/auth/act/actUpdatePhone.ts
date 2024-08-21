import { TPhone } from "@/pages/login/PhoneNumber";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const actUpdatePhone = createAsyncThunk("auth/actUpdatePhone", async (formData: TPhone, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const url = 'https://elmadrasah-development-ff14bf466889.herokuapp.com/user/profile/';
    const data = {
      phone: formData.phoneNumber,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${formData.token}` 
      }
    };

    const response = await axios.patch(url, data, config);
    
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

export default actUpdatePhone;