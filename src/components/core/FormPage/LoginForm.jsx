import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import { useDispatch } from "react-redux"
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setformData] = useState({email: "", password:""});
  const [showPassword, setshowPassword] = useState(false);

  const { email, password} = formData
  

  function changeHandler(event){
    setformData( (prev) => (
      {
        ...prev,
        [event.target.name]: event.target.value
      }
    ))
  }

  function submitHandler(event){
    event.preventDefault();

    dispatch(login(email, password, navigate));

    
  }

  return (
    <form 
    onSubmit={submitHandler}
    className='flex flex-col w-full gap-y-4 mt-6'>

      <label className='w-full '>
        <p className='relative text-[0.85rem] text-richblack-5 mb-1 leading-[1.375rem]'>
          Email Address <sup className='absolute top-[0.05em] text-xl pl-1 text-pink-200'>*</sup>
        </p>
        <input
        required
        type="email"
        placeholder='Enter Email Address'
        name='email'
        onChange = {changeHandler}
        value={formData.email}
        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0px_0px_#525252]'/>
      </label>

     <label className='w-full relative'>
        <p className='relative text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
          Password <sup className='absolute text-xl top-[0.05em] pl-1 text-pink-200'>*</sup>
        </p>
        <input 
        required
        type= { showPassword? ("text") : ("password")}
        placeholder='Enter Password'
        name='password'
        value={formData.password}
        onChange={changeHandler}
        className=' bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0px_0px_#525252]' />

        <span 
        className='absolute right-2 top-[38px] cursor-pointer'
        onClick={ () => {
          setshowPassword( pre  => !pre);
        }}>
              {
                  showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) :

                  (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
              }
        </span>

        <Link to="/forget-password">
          <p className='text-xs mt-1 text-blue-100 ml-auto max-w-max'>
            Forget Password
          </p>
        </Link>
     </label>

     <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6"
     type='submit'>
                Log In
      </button>


    </form>
  )
}

export default LoginForm