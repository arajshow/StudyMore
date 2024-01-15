import React from 'react'
import loginImage from "../assets/Images/login.webp"
import Template from '../components/core/FormPage/Template'

const Login = () => {
  return (
    <Template
        title="Welcome Back"
        desc1="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        formtype="login"
        imagetype = {loginImage}
     />
  )
}

export default Login