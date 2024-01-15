import React from 'react'

const FootBlock = (props) => {
  return (
    <div className='flex flex-col gap-[12px] justify-start'>
        <div className='font-semibold font-inter text-[16px] text-richblack-50'>
            {props.title}
        </div>
        <div className='flex flex-col gap-[8px] font-inter text-richblack-400 justify-start'>

        </div>
    </div>
  )
}

export default FootBlock