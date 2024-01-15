import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button'
import BannerVideo from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';

const Home = () => {

    return (
        <div>    

            

            { /* Section 1 */}

            <div className='relative mx-auto max-w-maxContent flex flex-col w-11/12 lg:items-center sm:justify-start 
            text-white lg:justify-between text-left '>


                <Link to={"/signup"}>
                    <div className='group mt-16 p-1 lg:mx-auto md:mx-auto mx-0 rounded-full bg-richblue-800 font-bold text-richblack-200
                    transition-all duration-200 hover:scale-95 w-fit shadow-[0_1px_0px_0px_#838894]'>
                        <div className='flex flex-row items-center gap-10 rounded-full px-[18px] py-[6px]
                        group-hover:bg-richblue-900'>
                            <p>
                                Become an Instructor
                            </p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className='lg:text-center md:text-center text-4xl font-semibold mt-6'>
                    Empower Your Future with <HighlightText text={"Coding Skills"} />
                </div>

                <div className='md:text-center  mt-4 w-[90%] text-lg font-bold text-richblack-200 '>
                    With our online coding courses, 
                    you can learn at your own pace, 
                    from anywhere in the world, 
                    and get access to a wealth of resources, 
                    including hands-on projects, quizzes, 
                    and personalized feedback from instructors.
                </div>

                <div className='flex flex-row items-center justify-center mt-8 gap-[24px]'>

                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>

                    <CTAButton  active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>

                </div>

                <div className='mt-[58px] shadow-[5px_20px_50px_7px_rgba(8,_112,_184,_0.7)]'>
                    <video
                    muted
                    loop
                    autoPlay>
                        <source src={BannerVideo} type="video/mp4" />
                    </video>
                </div>

                {/* code section 1*/}
                <div className='w-full'>
                    <CodeBlocks
                    position={"flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your <HighlightText text={"coding potential"} /> with our online courses.
                        </div>

                    }
                    subheading={`
                    Our courses are designed and taught by 
                    industry experts who have years of experience in coding and
                     are passionate about sharing their knowledge with you.`
                    }
                    ctabtn1={
                        {
                            active : true,
                            linkto : "/signup",
                            btnText: "Try it Yourself"
                        }
                    }
                    ctabtn2={
                        {
                            active : false,
                            linkto : "/login",
                            btnText: "Learn More"
                        }
                    }
                    CodeBlock={`<!DOCTYPE html> \n <html>\n <head><title>Example</title><linkrel="stylesheet"href="styles.css">\n </head>\n <body>\n <h1><a href="/">Header</a>\n </h1>\n <nav> <a href="one/">One</a> <a href="two/">Two</a> <a href="three/">Three</a>\n </nav>\n`}
                    backgroundGradiant={"bg-richblue-100"}
                    codeColor={"text-yellow-50"}
                     />
                </div>

                {/* code section 2*/}
                <div className='w-full'>
                    <CodeBlocks
                    position={"flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start <HighlightText text={"coding in seconds"} />
                        </div>

                    }
                    subheading={`
                    Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`
                    }
                    ctabtn1={
                        {
                            active : true,
                            linkto : "/signup",
                            btnText: "Continue Lesson"
                        }
                    }
                    ctabtn2={
                        {
                            active : false,
                            linkto : "/login",
                            btnText: "Learn More"
                        }
                    }
                    CodeBlock={`<!DOCTYPE html> \n <html>\n <head><title>Example</title><linkrel="stylesheet"href="styles.css">\n </head>\n <body>\n <h1><a href="/">Header</a>\n </h1>\n <nav> <a href="one/">One</a> <a href="two/">Two</a> <a href="three/">Three</a>\n </nav>\n`}
                    backgroundGradiant={"bg-yellow-100"}
                    codeColor={"text-yellow-25"}
                     />
                </div>

                <div className='w-[100%]'>
                    <ExploreMore />
                </div>


            </div> 




            { /* Section 2 */}
            <div className=' bg-pure-greys-5 text-richblack-700 pb-[100px]'>

                <div className='homepage_bg h-[320px]'>

                    <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between mx-auto'>
                        <div className='flex flex-row gap-[24px] mt-[120px]'>

                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex gap-[8px] items-center'>
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>

                            <CTAButton active={false} linkto={"/login"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>

                </div>

                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-[52px]'>

                    <div className='flex md:flex-row flex-col gap-[12px] mb-10 mt-[95px] justify-around'>

                        <div className='font-semibold text-4xl font-inter md:w-[45%]'>
                        Get the skills you need for a <HighlightText text={"job that is in demand."} />
                        </div>

                        <div className='flex flex-col gap-[32px] items-start md:w-[40%]'>
                            <div className=' font-inter text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>

                            <CTAButton active={true} linkto={"/login"}>
                                    Learn More
                                </CTAButton>
                        </div>
                    </div>

                    <TimeLineSection />

                    <LearningLanguageSection />
                </div>


            </div>



            { /* Section 3 */}

            <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between
            gap-8  text-white mt-[100px]'>

                <InstructorSection />

                
            <h2 className='md:text-center text-left text-4xl font-semobold mt-10'>Review from Other Learners</h2>
            {/* Review Slider here */}

            </div>




            { /* Section 4 */}
            <Footer />
        </div>

    );
}

export default Home;
