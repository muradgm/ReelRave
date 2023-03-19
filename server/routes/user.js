import express from "express";
import { isAuth } from "../middleware/auth.js";
import {
  signInValidator,
  userValidator,
  validate,
  validatePassword,
} from "../middleware/validator.js";
import {
  create,
  forgetPassword,
  resendEmailVerificationToken,
  resetPassword,
  sendResetPasswordTokenStatus,
  signIn,
  verifyEmail,
} from "../controllers/user.js";
import { isValidPasswordResetToken } from "../middleware/user.js";

const router = express.Router();

router.post("/sign-up", userValidator, validate, create);
router.post("/sign-In", signInValidator, validate, signIn);
router.post("/verify", userValidator, verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken); //resend-verification-token
router.post("/forget-password", forgetPassword);
router.post(
  "/verify-password-rest-token",
  isValidPasswordResetToken,
  sendResetPasswordTokenStatus
); //verify-password-reset-token
router.post(
  "/reset-password",
  validatePassword,
  validate,
  isValidPasswordResetToken,
  resetPassword
);

router.get("/is-auth", isAuth, (req, res) => {
  const { user } = req;
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      role: user.role,
    },
  });
});

export default router;
