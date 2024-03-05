import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "./Tab";

import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";

const SignupForm = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		// countryCode : "+91",
		// phone : "",
		createPassword: "",
		confirmPassword: "",
	});

	const [showPassword1, setshowPassword1] = useState(false);
	const [showPassword2, setshowPassword2] = useState(false);
	const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { firstName, lastName, email, password, confirmPassword } = formData;

	const changeHandler = (event) => {
		setFormData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const submitHandler = (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			toast.error("passwords Do Not Match");
			return;
		}

		// all data we got during signup process
		const signupData = { ...formData, accountType };

		// reset the form
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
		setAccountType(ACCOUNT_TYPE.STUDENT);

		// update these data in redux store
		dispatch(setSignupData(signupData));

		// send otp to use for verification
		dispatch(sendOtp(signupData.email, navigate));
	};

	// data to pass to Tab component
	const tabData = [
		{
			id: 1,
			tabName: "Student",
			type: ACCOUNT_TYPE.STUDENT,
		},
		{
			id: 2,
			tabName: "Instructor",
			type: ACCOUNT_TYPE.INSTRUCTOR,
		},
	];

	return (
		<div>
			{/* Tab */}
			<Tab tabData={tabData} field={accountType} setField={setAccountType} />
			{/* Form */}

			<form
				onSubmit={submitHandler}
				className="flex flex-col gap-4 mx-auto mb-40"
			>
				<div className="flex flex-row gap-[20px]">
					<label className="w-[50%] ">
						<p className="relative text-richblack-5">
							First Name{" "}
							<sup className="absolute top-[0.05em] pl-1 text-xl text-pink-200">
								*
							</sup>
						</p>

						<input
							required
							name="firstName"
							placeholder="Enter first name"
							value={formData.firstName}
							onChange={changeHandler}
							className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0px_0px_#525252]"
						/>
					</label>

					<label className="w-[50%] ">
						<p className="relative text-richblack-5">
							Last Name{" "}
							<sup className="absolute top-[0.05em] pl-1 text-xl text-pink-200">
								*
							</sup>
						</p>

						<input
							required
							name="lastName"
							placeholder="Enter last name"
							value={formData.lastName}
							onChange={changeHandler}
							className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0px_0px_#525252]"
						/>
					</label>
				</div>

				<label className="w-full">
					<p className="relative text-richblack-5">
						Email Address{" "}
						<sup className="absolute top-[0.05em] pl-1 text-xl text-pink-200">
							*
						</sup>
					</p>

					<input
						required
						name="email"
						placeholder="Enter email address"
						value={formData.email.toLowerCase()}
						onChange={changeHandler}
						className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0px_0px_#525252]"
					/>
				</label>

				{/* <div className='flex flex-row gap-[20px]'>

            <label className='relative flex flex-row mt-6 w-full justify-between'>
              <p className='bottom-[50px] absolute text-richblack-5'>
                Phone Number <sup className='absolute top-[0.05em] pl-1 text-xl text-pink-200'>*</sup>
              </p>

              <select
              required
              class="w-[75px] mr-[6px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-[0_1px_0px_0px_#525252] "
              name='countryCode'
              value={formData.countryCode}
              onChange={changeHandler}>
                  {
                    countryCode.map( (element, index) => (
                      <option
                      value={element.code}
                      key={index}
                      >
                        {element.code}
                      </option>
                    ))
                  }
              </select>

              <input 
              required
              name='phone'
              placeholder='1234567890'
              value={formData.phone}
              onChange={changeHandler}
              className='w-[75%] bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-[0_1px_0px_0px_#525252]' />
            </label>


            </div> */}

				<div className="flex flex-row gap-[20px]">
					<label className="relative w-[50%] ">
						<p className="relative text-richblack-5">
							Create Password{" "}
							<sup className="absolute top-[0.05em] pl-1 text-xl text-pink-200">
								*
							</sup>
						</p>

						<input
							required
							name="password"
							type={showPassword1 ? "text" : "password"}
							placeholder="Enter Password"
							value={formData.password}
							onChange={changeHandler}
							className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0px_0px_#525252]"
						/>

						<span
							className="absolute right-2 top-[38px] cursor-pointer"
							onClick={() => {
								setshowPassword1((pre) => !pre);
							}}
						>
							{showPassword1 ? (
								<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
							) : (
								<AiOutlineEye fontSize={24} fill="#AFB2BF" />
							)}
						</span>
					</label>

					<label className="relative w-[50%] ">
						<p className="relative text-richblack-5">
							Confirm Password{" "}
							<sup className="absolute top-[0.05em] pl-1 text-xl text-pink-200">
								*
							</sup>
						</p>

						<input
							required
							name="confirmPassword"
							type={showPassword2 ? "text" : "password"}
							placeholder="Enter Password"
							value={formData.confirmPassword}
							onChange={changeHandler}
							className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0px_0px_#525252]"
						/>

						<span
							className="absolute right-2 top-[38px] cursor-pointer"
							onClick={() => {
								setshowPassword2((pre) => !pre);
							}}
						>
							{showPassword2 ? (
								<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
							) : (
								<AiOutlineEye fontSize={24} fill="#AFB2BF" />
							)}
						</span>
					</label>
				</div>

				<button
					className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6"
					type="submit"
				>
					Create Account
				</button>
			</form>
		</div>
	);
};

export default SignupForm;
