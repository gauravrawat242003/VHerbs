import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// icons
import { FaCheckCircle } from "react-icons/fa";

// APIs
import { login } from '../services/operations/authAPIs';


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [rememberLogin, setRememberLogin] = useState(true)
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // calls login API
  const submitHandler = async (data) => {
    setLoading(true);

    // add remember me setting to data
    data.rememberLogin = rememberLogin;
    // console.log(data);

    // call login API
    await login(data, dispatch);

    setLoading(false);
  }

  return (
    <main>
      <div className='py-20 w-11/12 max-w-[1260px] min-h-screen mx-auto flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 mt-20'>

        {/* left section */}
        <div className='flex flex-col gap-8 w-full md:w-1/2'>
            {/* logo */}
            <div className='flex gap-2 items-center justify-center md:justify-start'>
              <img src='./logo.jpeg' className='h-10 rounded-full'/>
              <p className='text-2xl font-bold'>VHerb</p>
            </div>
            
            <div className='hidden md:flex gap-4'>
              {/* check icon */}
              <div>
                <FaCheckCircle size={18} className='mt-1 fill-[#16C60C]'/>
              </div>
              
              <div>
                <p className='text-xl font-semibold'>Discover Medicinal Wisdom</p>
                <p className='text-richblack-400'>Explore a rich collection of medicinal plants inspired by traditional AYUSH systems.</p>
              </div>
            </div>

            <div className='hidden md:flex gap-4'>
              {/* check icon */}
              <div>
                <FaCheckCircle size={18} className='mt-1 fill-[#16C60C]'/>
              </div>
              
              <div>
                <p className='text-xl font-semibold'>Interactive & Visual Learning</p>
                <p className='text-richblack-400'>Dive into detailed plant information with 3D models, images, and videos.</p>
              </div>
            </div>    

            <div className='hidden md:flex gap-4'>
              {/* check icon */}
              <div>
                <FaCheckCircle size={18} className='mt-1 fill-[#16C60C]'/>
              </div>
              
              <div>
                <p className='text-xl font-semibold'>Your Herbal Companion</p>
                <p className='text-richblack-400'>Meet Ayu AI — your smart assistant for all herbal knowledge and guidance.</p>
              </div>
            </div>
        </div>

        {/* right section - form */}
        <div className='w-full md:w-1/2 flex justify-center h-fit'>
          <form 
            onSubmit={handleSubmit(submitHandler)}
            className='w-full max-w-[500px] px-6 py-8 rounded-lg flex flex-col gap-6 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-[#f9f9f9]'
          >

            {/* heading */}
            <div>
              <p className='text-center text-2xl font-bold'>Welcome Back !</p>
            </div>

            {/* email */}
            <div>
              <label htmlFor='email'>Email</label>
              <input 
                type='email'
                id='email'
                placeholder='Enter your email'
                {...register("email", {required: true})}
                className='form-input'
              />
              {errors.email && <span className='text-red-400 text-sm'>Email is required</span>}
            </div>

            {/* password */}
            <div>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='Enter your password'
                {...register('password', {required:true})}
                className='form-input'
              />
              {errors.password && <span className='text-red-400 text-sm'>Password is required</span>}
            </div>

            {/* remember me & forget password */}
            <div className='flex justify-between'>

              {/* remember me checkbox */}
              <div className='flex items-center'>
                <input 
                  type='checkbox'
                  id="rememberLogin"
                  checked={rememberLogin}
                  onChange={() => setRememberLogin(prev => !prev)}
                  className='h-4 w-4 cursor-pointer'
                />
                <label htmlFor="rememberLogin" className="ml-2 text-richblack-400 cursor-pointer">Remember me</label>
              </div>

              {/* forget password */}
              <div>
                <button 
                  type='button'
                  onClick={() => navigate('/forgot-password')}
                  className='text-sm cursor-pointer text-[#4c82f5] hover:underline underline-offset-3'
                >
                  Forgot password ?
                </button>
              </div>
            </div>

            {/* login button */}
            <div>
              <button 
                  type='submit'
                  disabled={loading}
                  className='w-full cursor-pointer bg-[#16a34a] hover:bg-[#15803D] focus:outline-3 outline-green-300 text-white py-2 rounded-lg transition-all duration-300'
                >
                  Login
                </button>
            </div>

            {/* signup button */}
            <div className='flex gap-1 flex-wrap'>
              Don't have an account yet? 
              <button 
                className='inline cursor-pointer text-[#4c82f5] hover:underline underline-offset-3'
                onClick={() => navigate('/signup')}
              >
                Sign up here
              </button>
            </div>
          </form>
        </div>

      </div>
    </main>
  )
}

export default Login