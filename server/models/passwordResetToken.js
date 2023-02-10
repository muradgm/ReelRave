import mongoose from "mongoose";
import bcrypt from "bcrypt";

const passwordResetToken = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

passwordResetToken.pre("save", async function (next) {
  if (this.isModified("token")) {
    this.token = await bcrypt.hash(this.token, 10);
  }

  next();
});

// create a method to compare the user input token with the saved hashed token
passwordResetToken.methods.compareToken = async function (token) {
  const result = await bcrypt.compare(token, this.token);
  return result;
};

const PasswordResetToken = mongoose.model(
  "passwordResetToken",
  passwordResetToken
);

export default PasswordResetToken;
