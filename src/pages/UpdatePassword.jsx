import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at[-1];
    dispatch(
      resetPassword(password, confirmPassword, token, navigate, setFormData)
    );
  };

  return (
    <div
      className="relative mx-auto max-w-maxContent my-[20vh] flex flex-col w-3/12 lg:items-center justify-center
    text-white  text-left "
    >
      {loading ? (
        <div> Loading.......</div>
      ) : (
        <div className="flex flex-col gap-4 justify-start">
          <h1 className="font-bold text-2xl py-2">Choose new password</h1>

          <p className=" text-richblack-300 text-base">
            Almost done. Enter your new password and youre all set.
          </p>

          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <label className="relative ">
              <p className="relative text-richblack-5 mb-1">
                New Password{" "}
                <sup className="absolute top-[0.05em] pl-1 text-xl text-pink-200">
                  *
                </sup>
              </p>

              <input
                required
                name="password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={changeHandler}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0px_0px_#525252]"
              />

              <span
                className="absolute right-2 top-[38px] cursor-pointer"
                onClick={() => {
                  setShowNewPassword((pre) => !pre);
                }}
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <label className="relative">
              <p className="relative text-richblack-5 mb-1">
                Confirm new Password{" "}
                <sup className="absolute top-[0.05em] pl-1 text-xl text-pink-200">
                  *
                </sup>
              </p>

              <input
                required
                name="confirmPassword"
                type={showconfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={changeHandler}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0px_0px_#525252]"
              />

              <span
                className="absolute right-2 top-[38px] cursor-pointer"
                onClick={() => {
                  setShowconfirmPassword((pre) => !pre);
                }}
              >
                {showconfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            {/* character remarks */}

            <button
              type="submit"
              className="text-center px-[24px] py-[12px] rounded-md font-inter gap-[8px] font-semibold
                            bg-yellow-25 text-richblack-800 hover:scale-95 transition-all duration-200"
            >
              Reset Password
            </button>
          </form>

          <div>
            <Link
              to="/login"
              className="flex flex-row items-center gap-2 text-xl"
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

export default UpdatePassword;
