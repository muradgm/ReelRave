import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

export const generateOTP = (otp_length = 6) => {
  // generate a 6 digit OTP
  // let OTP = "";
  // for (let i = 0; i <= otp_length; i++) {
  //   const randomVal = Math.round(Math.random() * 9);
  //   OTP += randomVal;
  // }
  let OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: false,
  });

  return OTP;
};

export const generateMailTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });
