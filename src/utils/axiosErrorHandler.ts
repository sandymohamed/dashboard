import { isAxiosError } from "axios";

const axiosErrorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    return  error.response?.data.message || error.message || error;
  } else {
    return "An unexpected error occurred";
  }
};

export default axiosErrorHandler;