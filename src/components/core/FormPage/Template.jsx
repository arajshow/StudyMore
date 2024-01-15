import React, { useState } from 'react'
import HighlightText from "./HighlightText"
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import image from "../../../assets/Images/frame.png"



const Template = ({title, desc1, desc2, formtype, imagetype}) => {

    

  return (
    <div>
        <div className='w-11/12 flex max-w-[1250px] flex-row mx-auto justify-around mt-16'>

            <div className='flex flex-col lg:w-[40%] md:w-[50%] w-[65%] gap-[12px]'>

                <div className='flex flex-col justify-between gap-[12px]'>
                    <p className='text-4xl font-bold text-left text-white'>{title}</p>
                    <p className='text-md font-inter text-left text-richblack-300'>
                        {desc1}
                        <HighlightText text={desc2} />
                    </p>
                </div>

                {
                    formtype === "signup" ?
                    <SignupForm /> :
                    <LoginForm />
                }
            </div>


            <div className='relative max-w-maxContent lg:block hidden lg:w-[40%]'>



                <img src={imagetype}
                className='z-0 absolute -left-4 -top-4'
                width={558}
                height={504}
                loading="lazy" />

                <img 
                src={image}
                alt="student"
                width={558}
                height={490}
                loading="lazy"
                className="z-10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"
                />

            </div>



        </div>

    </div>
  )
}

export default Template