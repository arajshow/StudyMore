import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useSelector, useDispatch } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [confirmationModel, setConfirmationModel] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (profileLoading || authLoading) {
    return <div className="mt-10 text-white">Loading...</div>;
  }

  return (
    <div className="relative z-20 md:relative bg-richblack-800 border-r-[1px] border-r-richblack-600">
      <div className="flex min-w-[222px] flex-col h-[calc(100vh -3.5rem)] py-10  bg-richblack-800 border-r-[1px] border-r-richblack-600">
        <div className="flex flex-col gap-[10px]">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link?.type) return null;

            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>

        <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-600" />

        <div className="flex flex-col gap-[10px]">
          <SidebarLink
            link={{ name: "Settings", path: "dashboard/settings" }}
            iconName="VscSettingsGear"
          />

          <button
            onClick={() =>
              setConfirmationModel({
                text1: "Are You Sure ?",
                text2: "You will be logged out of your Account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModel(null),
              })
            }
            className="text-sm px-4 font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {confirmationModel && <ConfirmationModal modalData={confirmationModel} />}
    </div>
  );
};

export default Sidebar;
