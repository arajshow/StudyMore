import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getPasswordResetToken } from "../services/operations/authAPI";

export const ForgetPassword = () => {
  const dispatch = useDispatch();

  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);

  function submitHandler(event) {
    event.preventDefault();

    dispatch(getPasswordResetToken(email, setEmailSent));
  }

  return (
    <div
      className="relative mx-auto max-w-maxContent my-[20vh] flex flex-col w-3/12 lg:items-center justify-center
        text-white  text-left "
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-4 justify-start">
          <h1 className="font-bold text-2xl py-2">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>

          <p className=" text-richblack-300 text-base">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            {!emailSent && (
              <label>
                <p className=" text-richblack-5 mb-1">Email Address</p>
                <input
                  required
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0px_0px_#525252]"
                />
              </label>
            )}

            <button
              type="submit"
              className="text-center px-[24px] py-[12px] rounded-md font-inter gap-[8px] font-semibold
                            bg-yellow-25 text-richblack-800 hover:scale-95 transition-all duration-200"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div>
            <Link
              to="/login"
              className="flex flex-row text-xl items-center gap-2"
            >
              <IoIosArrowRoundBack />
              <p> Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
