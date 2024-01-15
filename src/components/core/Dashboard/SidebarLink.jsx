import React from "react";
import * as Icons from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { matchPath } from "react-router-dom";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`relative px-4 text-sm font-medium  text-richblack-300
      ${matchRoute(link.path) ? " bg-yellow-800" : "bg-opacity-0"} `}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${
          matchRoute(link.path) ? " opacity-100" : " opacity-0"
        }`}
      ></span>

      <div className="flex flex-row items-center gap-x-2 ">
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
