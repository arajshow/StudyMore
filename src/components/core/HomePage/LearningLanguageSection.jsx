import React from 'react'
import HighlightText from './HighlightText'

import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./Button"

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px]'>

        <div className='flex flex-col gap-5 md:items-center text-left'>

            <div className='text-4xl font-semibold'>
                Your Swiss Knife for <HighlightText text={"learning any language"} />
            </div>

            <div className='md:text-center text-left text-richblack-600 md:mx-auto items-start text-base w-[80%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over,
             progress tracking, custom schedule and more.
            </div>

            <div className='flex md:flex-row flex-col mx-auto items-center'>

                <img src={know_your_progress} className='object-contain md:-mr-32 md:translate-y-0 translate-y-20' />
                <img src={Compare_with_others} className='object-contain md:translate-y-0' />
                <img src={Plan_your_lessons} className='object-contain md:-ml-40 md:translate-y-0 -translate-y-28' />
            </div>

            <div className='w-fit mx-auto'>
                <CTAButton active={true} linkto={"/signup"} > Learn More</CTAButton>
            </div>


        </div>

    </div>
  )
}

export default LearningLanguageSection