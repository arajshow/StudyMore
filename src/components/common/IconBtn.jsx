import React from "react";

const IconBtn = ({
  text,
  children,
  onClick,
  disabled,
  outline = false,
  customClass,
  type,
  bgColor,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center text-richblack-900 ${
        outline ? "border border-yellow-50 bg-transparent" : ""
      } 
      ${
        bgColor ? `${bgColor}` : " bg-yellow-25"
      } cursor-pointer gap-x-2 rounded-md py-2 px-3 font-semibold  ${customClass}
      hover:scale-95 transition-all duration-200`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-yellow-50"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
