import React from 'react'
import instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowRight } from "react-icons/fa"


const InstructorSection = () => {
  return (
    <div className='flex md:flex-row flex-col md:items-center mx-auto gap-[98px] mb-[100px]'>


        <div className='md:w-[35%] flex flex-col gap-[12px] sm:order-0 md:order-1'>
            
            <div className='text-4xl w-[50%]'>
            Become an <HighlightText text={"instructor"} />
            </div>

            <div className='text-richblack-300 font-inter text-[16px]'>
                <p>
                    Instructors from around the world teach millions of students on StudyNotion.
                    We provide the tools and skills to teach what you love.
                </p>
            </div>

            <div className='w-fit mt-16 hidden md:block'>
                <CTAButton active ={true} linkto={"/signup"}>
                    <div className='flex gap-[8px] items-center'>
                            Start Teaching Today
                            <FaArrowRight />
                    </div>
                </CTAButton>
            </div>
        </div>

        <div className='md:w-[45%] order-0 '>
            <img src={instructor} className='shadow-[1px_10px_70px_7px_rgba(8,_112,_184,_0.7)] object-contain'/>
        </div>

        <div className=' min-w-max p-2 order-last items-start w-fit md:hidden sm:block'>
                <CTAButton active ={true} linkto={"/signup"}>
                    <div className='flex gap-[8px] items-center'>
                            Start Teaching Today
                            <FaArrowRight />
                    </div>
                </CTAButton>
            </div>

    </div>
  )
}

export default InstructorSection