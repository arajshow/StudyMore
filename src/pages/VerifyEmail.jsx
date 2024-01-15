import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { IoIosArrowRoundBack } from "react-icons/io";
import { GiBackwardTime } from "react-icons/gi";
import { sendOtp, signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
    setOtp("");
  };

  return (
    <div
      className="relative mx-auto max-w-maxContent my-[20vh] flex flex-col w-3/12 lg:items-center justify-center
    text-white  text-left "
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-4 justify-start">
          <h1 className="font-bold text-2xl py-2">Verify Email</h1>
          <p className=" text-richblack-300 text-base">
            A verification code has been sent to you. Enter the code below
          </p>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center text-2xl focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 12px",
              }}
            />
            <button
              type="submit"
              className="text-center px-[24px] py-[12px] rounded-md font-inter gap-[8px] font-semibold
                            bg-yellow-25 text-richblack-800 hover:scale-95 transition-all duration-200"
            >
              Verify Email
            </button>
          </form>

          <div className="flex flex-row justify-between">
            <div>
              <Link
                to="/login"
                className="flex flex-row items-center gap-2 text-xl"
              >
                <IoIosArrowRoundBack />
                <p> Back to Login</p>
              </Link>
            </div>

            <button
              className="flex flex-row gap-1 text-xl text-blue-300 items-center"
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
            >
              <GiBackwardTime />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
