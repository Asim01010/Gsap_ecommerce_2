import axios from "axios";

// REGISTER
const regUserService = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/register",
      userData
    );

    if (response.data) {
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Registration failed. Please try again."
    );
  }
};

export default regUserService;

//login user
export const loginUserService = async (loginData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/register/login-user",
      loginData
    );

    if (response.data) {
      localStorage.setItem("userInfo", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
};

// VERIFY OTP
export const verifyOTPService = async (otpData) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/register/verify-otp/${otpData?.id}`,
      { otp: otpData.otp }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "OTP verification failed."
    );
  }
};
