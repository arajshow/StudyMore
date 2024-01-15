import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CountryCode from "../../data/countrycode.json";
import { contactUs } from "../../services/operations/contactusAPI";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitHandler = async (data) => {
    console.log("logged data", data);
    dispatch(contactUs(data, setLoading));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-[32px]">
        <div className="flex gap-5">
          {/* firstName */}
          <div className="flex flex-col">
            <label htmlFor="firstname" className=" text-richblack-5">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0px_0px_#525252]"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && <span>Please enter Your name</span>}
          </div>

          {/* lastName */}
          <div className="flex flex-col">
            <label htmlFor="lastname" className=" text-richblack-5">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0px_0px_#525252]"
              placeholder="Enter Last name"
              {...register("lastname")}
            />
          </div>
        </div>

        {/* email */}
        <div className="flex flex-col">
          <label htmlFor="email" className=" text-richblack-5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0px_0px_#525252]"
            placeholder="Enter email Address"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please enter your email address</span>}
        </div>

        {/* phone */}
        <div className="relative flex flex-row mt-6 w-full justify-between">
          <p className="bottom-[50px] absolute text-richblack-5">
            Phone Number
          </p>

          <select
            class="w-[75px] mr-[6px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-[0_1px_0px_0px_#525252] "
            name="countryCode"
            {...register("countrycode", { required: true })}
          >
            {CountryCode.map((element, index) => (
              <option value={element.code} key={index}>
                {element.code}-{element.country}
              </option>
            ))}
          </select>

          <input
            placeholder="12345 67890"
            className="w-[75%] bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-[0_1px_0px_0px_#525252]"
            {...register("phoneNo", {
              required: { value: true, message: "Please enter Phone Number" },
              maxLength: { value: 10, message: "Invalid Phone Number" },
              minLength: { value: 10, message: "Invalid Phone Number" },
            })}
          />
          {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
        </div>

        {/* message */}
        <div className="flex flex-col">
          <label htmlFor="message" className=" text-richblack-5">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0px_0px_#525252]"
            rows="7"
            placeholder="Enter Your message here"
            {...register("message", { required: true })}
          />
          {errors.message && <span>PLease enter your message.</span>}
        </div>

        <button
          type="submit"
          className="rounded-md bg-yellow-50 text-center p-[12px] text-[16px] font-bold text-black"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
