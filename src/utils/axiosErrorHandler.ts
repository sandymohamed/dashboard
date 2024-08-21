import { isAxiosError } from "axios";

const axiosErrorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    return  error.response?.data.non_field_errors[0] || error.response?.data.message || error.message || error;
  } else {
    return "An unexpected error occurred";
  }
};

export default axiosErrorHandler;