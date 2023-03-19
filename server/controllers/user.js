import User from "../models/user.js";
import EmailVerificationToken from "../models/emailVerificationToken.js";
import { isValidObjectId } from "mongoose";
import { generateMailTransporter, generateOTP } from "../utils/mail.js";
import { generateRandomByte, sendError } from "../utils/helper.js";
import PasswordResetToken from "../models/passwordResetToken.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return sendError(res, "This email is already in use!");
  }
  const newUser = new User({ name, email, password });

  // saving the user to the db is an async task and for that we use the async/await.
  await newUser.save();

  // generate a 6 digit OTP
  let OTP = generateOTP();
  // store OTP inside our db
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  // send the OTP to the user
  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reelrave.com",
    to: newUser.email,
    subject: "Email Verification",
    html: `
    <p> Your Verification OTP</p>
    <h1>${OTP}</h1>
    <a href="localhost:3000/auth/verification">Verify your email</a>
    `,
  });

  res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

export const verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return sendError(res, "Invalid user!");

  const user = await User.findById(userId);
  if (!user) return sendError(res, "user not found!", 404);

  if (user.isVerified) return sendError(res, "user is already verified!");

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) return sendError(res, "Token not found!");

  const matching = await token.compareToken(OTP);
  if (!matching) return sendError(res, "Please submit a valid OTP");

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reelrave.com",
    to: user.email,
    subject: `Welcome ${user.name}`,
    html: `
    <h1>Welcome to our app, and thank you for choosing ReelRave.com</h1>
    `,
  });

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: jwtToken,
      isVerified: user.isVerified,
      role: user.role,
    },
    message: "Your email is verified!",
  });
};

export const resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return sendError(res, "user not found!");

  if (user.isVerified) return sendError(res, "user is already been verified!");

  const hasAToken = await EmailVerificationToken.findOne({
    owner: userId,
  });
  if (hasAToken) {
    const timeDiff = Date.now() - hasAToken.createAt;

    return sendError(
      res,
      `You must wait ${Math.round(
        (3600000 - timeDiff) / 1000 / 60
      )} minutes before requesting new OTP!`
    );
  }

  // generate a 6 digit OTP
  let OTP = generateOTP();
  // store OTP inside our db
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  // send the OTP to the user
  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reelrave.com",
    to: user.email,
    subject: "Email Verification",
    html: `
    <p> Your Verification OTP</p>
    <h1>${OTP}</h1>
    `,
  });

  res.json({
    message: "New OTP has been sent to your registered email account!",
  });
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return sendError(res, "email is messing!");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "user not found!", 404);

  const hasAToken = await PasswordResetToken.findOne({ owner: user._id });
  if (hasAToken) {
    const timeDiff = Date.now() - hasAToken.createAt;

    return sendError(
      res,
      `You must wait ${Math.round(
        (3600000 - timeDiff) / 1000 / 60
      )} minutes before requesting another Token!`
    );
  }
  const token = await generateRandomByte();
  const newPasswordResetToken = new PasswordResetToken({
    owner: user._id,
    token,
  });
  await newPasswordResetToken.save();

  const resetPasswordUrl = `http://localhost:3000/auth/reset-password?token=${token}&id=${user._id}`;

  const transport = generateMailTransporter();

  transport.sendMail({
    from: "security@reelrave.com",
    to: user.email,
    subject: "Password Reset Link",
    html: `
    <p>Click the link below to reset your password</p>
    <a href=${resetPasswordUrl}>Change Password</a>
    `,
  });

  res.json({
    message: "Link sent to your email!",
  });
};

export const sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

export const resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);
  const matched = await user.comparePassword(newPassword);
  if (matched)
    return sendError(
      res,
      "the new password must be different from the old one!"
    );

  user.password = newPassword;
  await user.save();

  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

  const transport = generateMailTransporter();

  transport.sendMail({
    from: "security@reelrave.com",
    to: user.email,
    subject: "Password Reset Successfully",
    html: `
    <h1>Password Reset Successfully</h1>
    <p>Now you can use your new password</p>
    `,
  });

  res.json({
    message: "Password has been reset successfully!",
  });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email/Password mismatch!");

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Email/Password mismatch!");

  const { _id, name, role, isVerified } = user;

  const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);

  res.json({
    user: { id: _id, name, email, token: jwtToken, isVerified, role },
  });
};
