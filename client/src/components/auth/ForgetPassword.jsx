import React, { useState } from "react";
import Container from "../Container";
import CustomLink from "../CustomLink";
import Input from "../form/Input";
import Submit from "../form/Submit";
import Title from "../form/Title";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";
import { forgetPassword } from "../../api/auth";
import { isValidEmail } from "../../utils/helper";
import { useNotification } from "../../hooks";
import { useNavigate } from "react-router-dom";

const validateUserEmail = (email) => {
  const emailValidation = isValidEmail(email);
  if (!emailValidation.ok) return emailValidation;
  return { ok: true };
};

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const { updateNotification } = useNotification();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, ok } = validateUserEmail(email);
    if (!ok) return updateNotification("error", error);

    const response = await forgetPassword(email);
    if (response.error) return updateNotification("error", response.error);

    updateNotification("success", response.message);
  };

  return (
    <FormContainer>
      <Container classes="drop-shadow">
        <form onSubmit={handleSubmit} className={` ${commonModalClasses} w-96`}>
          <Title>Please Enter Your Email</Title>
          <Input
            onChange={handleChange}
            value={email}
            label="Email"
            placeholder="john@gmail.com"
            name="email"
          />
          <Submit value="Send Link" />
          <div className="flex justify-between">
            <CustomLink to="/auth/sign-in">Sign in</CustomLink>
            <CustomLink to="/auth/sign-up">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default ForgetPassword;
