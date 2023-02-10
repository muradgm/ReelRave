import React, { useEffect, useState } from "react";
import Container from "../Container";
import Input from "../form/Input";
import Submit from "../form/Submit";
import Title from "../form/Title";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { resetPassword, verifyPasswordRestToken } from "../../api/auth";
import { useNotification } from "../../hooks";
import { isValidPassword } from "../../utils/helper";

const validateNewPassword = (password, confirmPassword) => {
  const passwordValidation = isValidPassword(password);
  if (!passwordValidation.ok) return passwordValidation;

  if (!confirmPassword || confirmPassword.length === 0)
    return { ok: false, error: "Confirm Password is missing!" };
  if (password.trim() !== confirmPassword.trim())
    return { ok: false, error: "passwords do not match!" };

  return { ok: true };
};

const ResetPassword = () => {
  const [password, setPassword] = useState({
    new: "",
    confirmNew: "",
  });
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const [searchParams] = useSearchParams();
  const { updateNotification } = useNotification();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const navigate = useNavigate();

  const isValidToken = async () => {
    setIsVerifying(false);
    const { error, valid } = await verifyPasswordRestToken(token, id);
    if (error) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", error);
    }
    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }
    setIsValid(true);
  };

  useEffect(() => {
    isValidToken();
  }, []);

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex items-center justify-center space-x-2">
            <CgSpinner size={32} className="animate-spin dark:text-accent" />
            <h1 className="text-2xl font-semibold dark:text-accent text-primary">
              Please wait, we're verifying your token!
            </h1>
          </div>
        </Container>
      </FormContainer>
    );

  if (!isValid)
    return (
      <FormContainer>
        <Container>
          <h1 className="text-2xl font-semibold dark:text-accent text-primary">
            Sorry, the token is invalid!
          </h1>
        </Container>
      </FormContainer>
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { ok, error } = validateNewPassword(
      password.new,
      password.confirmNew
    );
    if (!ok) return updateNotification("error", error);
    const response = await resetPassword({
      newPassword: password.new,
      userId: id,
      token: token,
    });
    if (response.error) return updateNotification("error", response.error);

    updateNotification("success", response.message);
    navigate("/auth/sign-in", { replace: true });
  };

  return (
    <FormContainer>
      <Container classes="drop-shadow">
        <form onSubmit={handleSubmit} className={` ${commonModalClasses} w-96`}>
          <Title>Enter New Password</Title>
          <Input
            defaultValue={password.new}
            onChange={handleChange}
            label="New Password"
            placeholder="********"
            name="new"
            type="password"
          />
          <Input
            defaultValue={password.confirmNew}
            onChange={handleChange}
            label="Confirm New Password"
            placeholder="********"
            name="confirmNew"
            type="password"
          />
          <Submit value="Confirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default ResetPassword;
