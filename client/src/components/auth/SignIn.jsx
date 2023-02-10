import React, { useEffect, useState } from "react";
import Container from "../Container";
import CustomLink from "../CustomLink";
import Input from "../form/Input";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";
import { useAuth, useNotification } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../../utils/helper";

const validateUserInfo = ({ email, password }) => {
  const emailValidation = isValidEmail(email);
  if (!emailValidation.ok) return emailValidation;

  const passwordValidation = isValidPassword(password);
  if (!passwordValidation.ok) return passwordValidation;
  return { ok: true };
};

export const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification("error", error);

    handleLogin(userInfo.email, userInfo.password);
  };

  return (
    <FormContainer>
      <Container classes="drop-shadow">
        <form onSubmit={handleSubmit} className={`${commonModalClasses} w-72`}>
          <Title>Sign In</Title>
          <Input
            value={userInfo.email}
            onChange={handleChange}
            label="Email"
            placeholder="john@gmail.com"
            name="email"
          />
          <Input
            value={userInfo.password}
            onChange={handleChange}
            label="Password"
            placeholder="******"
            name="password"
            type="password"
          />
          <Submit value="Sign In" busy={isPending} />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password</CustomLink>
            <CustomLink to="/auth/sign-up">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};
