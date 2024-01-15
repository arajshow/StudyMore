import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { PiUploadSimpleBold } from "react-icons/pi";

const ChangeProfilePicture = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex md:flex-row flex-col items-center justify-start rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 ">
      <div className="flex md:flex-row flex-col items-center ">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className=" font-bold text-base text-richblack-5">
            Change Profile Picture
          </p>
          <div className="flex flex-row gap-2  ">
            <IconBtn
              text="Select"
              customClass={`mt-2`}
              onclick={() => {
                navigate("/dashboard/settings");
              }}
            />
            <IconBtn
              customClass={`mt-2 bg-opacity-40`}
              bgColor={`bg-richblack-500`}
              onclick={() => {
                navigate("/dashboard/settings");
              }}
            >
              <div className=" bg-o text-richblack-25 flex items-center gap-1">
                <p>Upload</p>
                <PiUploadSimpleBold />
              </div>
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
