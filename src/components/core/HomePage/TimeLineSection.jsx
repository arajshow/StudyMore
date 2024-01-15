import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timeLineImage from "../../../assets/Images/TimelineImage.png"


const TimeLineSection = () => {

    const timeLine = [
        {
            Logo : Logo1,
            Heading : "LeaderShip",
            Description : "Fully Commited to the success Companey"
        },
        {
            Logo : Logo2,
            Heading : "LeaderShip",
            Description : "Fully Commited to the success Companey"
        },
        {
            Logo : Logo3,
            Heading : "LeaderShip",
            Description : "Fully Commited to the success Companey"
        },
        {
            Logo : Logo4,
            Heading : "LeaderShip",
            Description : "Fully Commited to the success Companey"
        },
    ]

  return (
    <div>
        <div className='flex md:flex-row flex-col gap-15 items-center '>

            <div className='md:w-[45%] flex flex-col gap-8 md:mb-0 mb-16'>
                {
                    timeLine.map( (element, index) => {
                        return (
                            <div>

                                <div className='flex flex-row gap-6' key={index}>

                                    <div className='w-[50px] h-[50px] bg-white flex flex-col items-center pt-3 rounded-full'>
                                        <img src={element.Logo} />
                                    </div>

                                    <div>
                                        <h2 className='font-semibold text-[18px]'>
                                            {element.Heading}
                                        </h2>
                                        <p className='text-base'>{element.Description}</p>
                                    </div>
                                </div>


                            </div>

                            
                        )
                    })
                }
            </div>

            <div className='relative'>



                <img src={timeLineImage} className='shadow-white object-coverh-fit relative z-10 ' />



                <div className=' z-20 absolute bg-caribbeangreen-700 flex md:flex-row flex-col text-white uppercase
                                p-[42px] left-[50%] translate-x-[-50%] translate-y-[-50%] gap-[42px]'>
                    
                    <div className='flex flex-row gap-5 items-center md:border-r  border-caribbeangreen-300 px-7'>

                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-sm text-caribbeangreen-300'>Years of Experience</p>

                    </div>
                    
                    <div className='flex flex-row gap-5 items-center px-7'>

                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-sm text-caribbeangreen-300'>Types of Courses</p>

                    </div>

                </div>

                <div className={` z-0 blur-xl absolute bg-blue-100 rounded-[50%] w-[105%] h-[100%] bottom-0 left-[-10px]`} />

            </div>

        </div>
    </div>
  )
}

export default TimeLineSection