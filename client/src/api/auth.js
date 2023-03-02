import { catchError } from "../utils/helper";
import client from "./client";

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/sign-up", userInfo);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const verifyUserEmail = async (userInfo) => {
  try {
    const { data } = await client.post("/user/verify", userInfo);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const signInUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/sign-in", userInfo);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getIsAuth = async (token) => {
  try {
    const { data } = await client.get("/user/is-auth", {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const forgetPassword = async (email) => {
  try {
    const { data } = await client.post("/user/forget-password", { email });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const verifyPasswordRestToken = async (token, userId) => {
  try {
    const { data } = await client.post("/user/verify-password-rest-token", {
      token,
      userId,
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const resetPassword = async (passwordData) => {
  try {
    const { data } = await client.post("/user/reset-password", passwordData);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const resendOTP = async (userId) => {
  try {
    const { data } = await client.post(
      "/user/resend-email-verification-token",
      { userId }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};
