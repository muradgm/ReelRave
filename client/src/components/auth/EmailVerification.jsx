import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../Container";
import Submit from "../form/Submit";
import Title from "../form/Title";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";
import { resendOTP, verifyUserEmail } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";

const OTP_LENGTH = 6;
const isValidOtp = (otp) => {
  const isGreaterThanZero = otp.every((input) => input.length > 0);
  const isValid = otp.every((input) => input.match(/^[0-9a-zA-Z]+$/));
  if (!isGreaterThanZero)
    return { valid: false, err: "OTP must be 6 characters long!" };

  if (!isValid) return { valid: false, err: "OTP is invalid!" };

  return { valid: true };
};

const EmailVerification = () => {
  const { updateNotification } = useNotification();
  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const isVerified = profile?.isVerified;

  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef();

  const navigate = useNavigate();
  const { state } = useLocation();
  const user = state?.user;

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    /*
    The function takes in two parameters, e and index.
    e is the event object that is passed when the input's value is changed.
    index is the index of the current input element in the OTP array.
    It starts by destructuring the value property from the event's target which is the input element.
    Then, it calls the setOtp function and passes in a callback function. The callback function takes in the current state of the otp and returns an updated version of the otp array.
    Inside the callback function, it creates a new variable updatedOtp that uses the spread operator to create a copy of the current otp array.
    Then, it updates the value of the updatedOtp array at the current index with the new value that was entered.
    Next, it calls the setActiveOtpIndex function and passes in a ternary operator that checks if the value entered is truthy or falsy. If it's truthy, it sets the activeOtpIndex to the current index + 1, which will move the focus to the next input field. If it's falsy, it sets the activeOtpIndex to the current index - 1, which will move the focus to the previous input field.
    Finally, it returns the updated otp array.
    This version of the function combines the logic of updating the otp state and activeOtpIndex state in a single setOtp call. It also eliminates the need for the two separate helper functions to move the focus to the next or previous input field.
    */
    setOtp((otp) => {
      let updatedOtp = [...otp];
      updatedOtp[index] = value;
      setActiveOtpIndex(value ? index + 1 : index - 1);
      return updatedOtp;
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      if (index > 0) setActiveOtpIndex(index - 1);

      return;
    }
  };

  const handleOtpResend = async () => {
    const { error, message } = await resendOTP(user.id);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
  };

  useEffect(() => {
    // we use the ?, because the first render gonna return nothing which means we gonna have an error. so we use the ? to say only if there's something and the .current is true, then continue with the logic.
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
  }, [user, navigate, isLoggedIn, isVerified]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { err, valid } = isValidOtp(otp);
    if (!valid) return updateNotification("error", err);

    const {
      error,
      message,
      user: userResponse,
    } = await verifyUserEmail({
      OTP: otp.join(""),
      userId: user.id,
    });
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    localStorage.setItem("auth-token", userResponse.token);
    isAuth();
  };

  return (
    <FormContainer>
      <Container classes="drop-shadow">
        <form onSubmit={handleSubmit} className={` ${commonModalClasses}`}>
          <div>
            <Title>Please Enter the OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your email.
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  key={index}
                  ref={activeOtpIndex === index ? inputRef : null}
                  type="text"
                  pattern="[0-9a-zA-Z]*"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border-2 rounded dark:border-dark-subtle border-light-subtle dark:focus:border-accent focus:border-primary bg-transparent outline-none text-center dark:text-accent text-primary font-semibold text-xl spin-button-none"
                />
              );
            })}
          </div>
          <div className="">
            <Submit value="Verify Account " />
            <button
              type="button"
              onClick={handleOtpResend}
              className="text-sm font-semibold dark:text-accent text-blue-500  hover:underline mt-4"
            >
              I don't have OTP
            </button>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default EmailVerification;
