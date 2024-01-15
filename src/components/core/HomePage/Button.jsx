import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
      <div className={`mx-auto text-center px-[24px] py-[12px] rounded-md font-inter gap-[8px] font-semibold
      ${ active ? "bg-yellow-25 text-richblack-800" : " bg-richblue-800 text-richblack-50"}
      hover:scale-95 transition-all duration-200`}
      >
          {children}
      </div>
  </Link>
  )
}

export default Button