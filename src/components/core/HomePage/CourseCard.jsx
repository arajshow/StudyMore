import React from 'react'
import { FaArrowRight } from "react-icons/fa"

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {


    return (
    <div className={`flex flex-col
    ${currentCard === cardData.heading ? " bg-white text-richblack-800 shadow-[15px_15px_0px_0px_rgba(253,224,61)]" : 
    " bg-richblack-800 text-richblack-25"} h-[300px] rounded-md cursor-pointer transition-all duration-200 hover:scale-105`}
    onClick={ () => setCurrentCard(cardData.heading)}>
        <div className='flex flex-col justify-start p-6 h-[80%] gap-4'>
            <div className='text-xl font-semibold '>
                {cardData.heading}
            </div>
            <p className=' text-richblack-400 text-sm'>
                {cardData.description}
            </p>
        </div >
            
        <div className='flex flex-row gap-[16px] py-4 px-3 border-t b-[2px] border-dashed justify-between'>
            <div className='flex flex-row items-center gap-[8px]'>
                <FaArrowRight />
                {cardData.level}
            </div>
            <div className='flex flex-row items-center gap-[8px]'>
                <FaArrowRight />
                <p> {cardData.lessionNumber} Lessons</p>
            </div>
        </div>
{/* <CourseCard 
key={index}
cardData = {element}
currentCard = {currentCard}
setCurrentCard = {setCurrentCard}
/> */}

    </div>
  )
}

export default CourseCard