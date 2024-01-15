import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import SignupButton from "../core/HomePage/SignupButton";
import LoginButton from "../core/HomePage/LoginButton";

const subLinks = [
  {
    title: "python",
    link: "catlog/python",
  },
  {
    title: "web dev",
    link: "/catlog/web-devlopment",
  },
  {
    title: "python",
    link: "catlog/python",
  },
  {
    title: "web bekar",
    link: "/catlog/web-devlopment",
  },
];

const Navbar = () => {
  // console.clear();
  const { token } = useSelector((state) => state.auth) || { token: null };
  const { user } = useSelector((state) => state.profile) || { user: null };
  const { totalItems } = useSelector((state) => state.cart) || {
    totalItems: null,
  };

  const location = useLocation();
  function matchRoute(route) {
    return matchPath({ path: route }, location.pathname);
  }

  //     const [subLinks, setSubLinks] = useState([]);

  //     // for checking the active navigation menu using useLocation matchPath method

  // // method used in useEffect hook to
  //     const fetchSublinks = async() => {
  //         try{
  //             const result = await apiConnector("GET", categories.CATAGORIES_API)
  //             console.log("Print in Sublinks result:", categories.CATAGORIES_API, result);
  //             setSubLinks(result.data.data);
  //         }
  //         catch(error){
  //             console.log("Cloud not fetch the categories list");
  //         }
  //     }

  //     useEffect( () => {
  //         fetchSublinks();
  //     }, [])

  return (
    <div className="flex h-16 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="w-11/12 max-w-maxContent flex flex-row items-center justify-between ">
        {/* image */}
        <Link to="/">
          <img src={logo} width={160} height={42} loading="lazy" />
        </Link>

        {/* Nav links */}
        <nav>
          <ul className="flex flex-row gap-x-6 text-richblack-25 cursor-pointer">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative group flex items-center gap-3 z-10">
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />

                    <div
                      className="invisible absolute -left-28  top-10
                                    flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200
                                    group-hover:visible group-hover:opacity-100 lg:w-[300px]"
                    >
                      <div
                        className="absolute left-44 -top-2 h-6 w-6 rotate-45 rounded
                                        bg-richblack-5"
                      ></div>

                      {subLinks.length ? (
                        subLinks.map((sublink, index) => (
                          <Link to={`${sublink.link}`} key={index}>
                            <p>{sublink.title}</p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative text-richblack-5">
              <AiOutlineShoppingCart />
              {totalItems > 0 && (
                <span className="absolute bottom-3">{totalItems}</span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              {/* <button>
                            Log in
                        </button> */}
              <LoginButton />
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <SignupButton />
            </Link>
            // <button>
            //     Log in
            // </button>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
