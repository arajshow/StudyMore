import React from 'react'
import signupImage from "../assets/Images/signup.webp"
import Template from '../components/core/FormPage/Template'

const Signup = () => {
  return (
    <Template
        title="Join the millions learning to code with StudyNotion for free"
        desc1="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        formtype="signup"
        imagetype = {signupImage}
     />
  )
}
 
export default Signup