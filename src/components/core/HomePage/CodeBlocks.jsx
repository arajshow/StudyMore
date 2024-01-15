import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import CTAButton from './Button'
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, CodeBlock, backgroundGradiant, codeColor
}) => {
  return (
    <div className={`flex ${position} lg:flex-row flex-col justify-between mt-8 md:py-[90px] py-[36px]` }>

        {/* text-section */}
        <div className='lg:w-[50%] flex flex-col gap-[12px]'>
            {heading}
            <div className='text-richblack-300 font-inter text-[16px]'>
                {subheading}
            </div>

            <div className='flex flex-row gap-[24px] pt-[52px] mb-6 sm:mx-auto lg:mx-0'>

                <CTAButton active ={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-[8px] items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>

                <CTAButton active ={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* codde section */}

        <div className='bg-opacity-50 relative h-fit flex flex-row text-[15px] md:w-[50%] sm:w-full p-5 md:w-[500px] border-t border-l backdrop-opacity-40 border-richblack-500 bg-richblack-700 mx-auto'>

            {/* gradiant apply */}
            

            <div className='order-2 text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>

            </div>

            <div className={`order-2 w-[90%] flex flex-col gap-[2px] font-bold font-mono ${codeColor} `}>
                <TypeAnimation
                sequence={[CodeBlock, 3000, ""]}
                repeat={Infinity}
                cursor={true}
                style={
                    {
                        whiteSpace: "pre-line",
                        display:"block",
                    }
                }
                omitDeletionAnimation={true}
                />
            </div>

            <div className={`blur-2xl opacity-30 bg-opacity-40 absolute bottom-[35%] right-[30%] ${backgroundGradiant} rounded-[50%] w-[75%] h-[75%]`} />
        </div>
    </div>
  )
}


export default CodeBlocks