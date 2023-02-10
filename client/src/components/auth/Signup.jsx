import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks/index.js";
import Container from "../Container";
import CustomLink from "../CustomLink";
import Input from "../form/Input";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";
import { createUser } from "../../api/auth";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../../utils/helper.js";

export const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const { updateNotification } = useNotification();
  const { name, email, password, confirmPassword } = userInfo;
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const validateUserInfo = ({ name, email, password, confirmPassword }) => {
    const nameValidation = isValidName(name);
    if (!nameValidation.ok) return nameValidation;

    const emailValidation = isValidEmail(email);
    if (!emailValidation.ok) return emailValidation;

    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.ok) return passwordValidation;

    if (!confirmPassword || confirmPassword.length === 0)
      return { ok: false, error: "Confirm Password is missing!" };
    if (password.trim() !== confirmPassword.trim())
      return { ok: false, error: "passwords do not match!" };

    return { ok: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification("error", error);

    const response = await createUser(userInfo);
    if (response.error) return updateNotification("error", error);
    navigate("/auth/verification", {
      state: { user: response.user },
      replace: true, // The replace option when navigating to a new location in a web application tells the browser to replace the current entry in the browser's history with the new one, so that the user cannot navigate back to the previous page using the browser's back button. This is often used when navigating to a page that should not be able to be navigated away from, such as a login or verification page.
    });
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  return (
    <FormContainer>
      <Container classes="drop-shadow">
        <form onSubmit={handleSubmit} className={`${commonModalClasses} w-72`}>
          <Title>Sign up</Title>
          <Input
            value={name}
            onChange={handleChange}
            label="Name"
            placeholder="john Doe"
            name="name"
          />
          <Input
            value={email}
            onChange={handleChange}
            label="Email"
            placeholder="john@gmail.com"
            name="email"
          />
          <Input
            value={password}
            onChange={handleChange}
            label="Password"
            placeholder="******"
            name="password"
            type="password"
          />
          <Input
            value={confirmPassword}
            onChange={handleChange}
            label="Confirm Password"
            placeholder="******"
            name="confirmPassword"
            type="password"
          />
          <Submit value="Sign up" />
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password</CustomLink>
            <CustomLink to="/auth/sign-in">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};
