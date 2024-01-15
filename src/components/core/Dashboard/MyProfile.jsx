import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { MdOutlineEdit } from "react-icons/md";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:mx-[32px] mx-[12px] gap-14">
      <h1 className="ml-16 md:ml-10 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      {/* section 1 */}
      <div className="flex md:flex-row flex-col items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 ">
        <div className="flex md:flex-row flex-col items-center ">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className=" font-bold text-lg text-richblack-5">
              {" "}
              {user?.firstName + " " + user?.lastName}{" "}
            </p>
            <p className=" text-base text-richblack-500"> {user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          customClass={`mt-2`}
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <MdOutlineEdit />
        </IconBtn>
      </div>

      {/* section 2 */}
      <div className="flex flex-col gap-8 justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 ">
        <div className="flex flex-row  items-center justify-between">
          <p className="font-bold text-lg text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <MdOutlineEdit />
          </IconBtn>
        </div>
        <p className="font-bse text-richblack-500">
          {" "}
          {user?.additionalDetails?.about ?? "Write Something about Yourself"}
        </p>
      </div>

      {/* section 3 */}
      <div className="flex flex-col gap-8 justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 ">
        <div className="flex flex-row  items-center justify-between">
          <p className="font-bold text-lg text-richblack-5">Personal Details</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <MdOutlineEdit />
          </IconBtn>
        </div>
        <div className="flex md:flex-row flex-col gap-y-5 md:gap-y-0 max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {/* {formattedDate(user?.additionalDetails?.dateOfBirth) */}
                {user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
