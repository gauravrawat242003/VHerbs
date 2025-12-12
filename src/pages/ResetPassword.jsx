import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

// icons
import { PiLockKeyLight } from "react-icons/pi";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

// components
import { IconBtn } from '../components/common/IconBtn';

// APIs
import { resetPassword } from '../services/operations/authAPIs';

const ResetPassword = () => {

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // get token from params
  const {token} = useParams();

  const [loading, setLoading] = useState(false);

  // function to reset pssword
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword) {
      toast.error("Both password must be same");
      return;
    }

    // create form data
    const formData = new FormData();
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('token', token);

    setLoading(true);

    // call API
    const result = await resetPassword(formData);
    if(result) {
      // redirect to login page
      navigate('/login');
    }

    setLoading(false);
  }

  return (
    <div className='w-11/12 mx-auto py-20 h-screen flex justify-center items-center'>
        <div 
          className='flex flex-col gap-8 p-8 py-10 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]' 
        >

            {/* heading */}
            <div>
                {/* icon */}
                <div className='flex justify-center text-red-500 '>
                  <PiLockKeyLight size={50}/>
                </div>
  
                {/* heading */}
                <div className='font-semibold text-3xl text-richblack-400 text-center'>
                    <h2>Reset Password</h2>
                </div>
            </div>

            {/* form */}
            <div className='flex flex-col gap-6'>
                {/* password inputs */}
                <div className='space-y-5'>
                    {/* password */}
                    <div>
                        <label className='relative'>
                          <p>New Password<sup className='text-red-500'>*</sup></p>
        
                          <input
                            type={`${showPassword ? 'text' : 'password'}`}
                            className='w-full p-[0.5rem] rounded-[5px] border-[1px] border-[#585d69] outline-none pe-10' 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                          />
        
                          <span className='absolute top-[70%] right-2 text-richblack-400 cursor-pointer' 
                            onClick={() => setShowPassword(prev => !prev)}
                          >
                          {
                            showPassword ? (
                              <VscEyeClosed/>
                            ) :(
                              <VscEye />
                            )
                          }
                          </span>
                        </label>
                    </div>

                    {/* confirm password */}
                    <div>
                        <label className='relative'>
                          <p>Confirm Password<sup className='text-red-500'>*</sup></p>
        
                          <input
                            type={`${showConfirmPassword ? 'text' : 'password'}`}
                            className='w-full p-[0.5rem] rounded-[5px] border-[1px] border-[#585d69] outline-none pe-10' 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                          />
        
                          <span className='absolute top-[70%] right-2 text-richblack-400 cursor-pointer' 
                            onClick={() => setShowConfirmPassword(prev => !prev)}
                          >
                          {
                            showConfirmPassword ? (
                              <VscEyeClosed/>
                            ) :(
                              <VscEye />
                            )
                          }
                          </span>
                        </label>
                    </div>

                </div>
  
                {/* button */}
                <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                  <IconBtn
                    text="Reset Password"
                    onClick={handlePasswordReset}
                    disabled={loading}
                  />
  
                  <NavLink 
                    className='text-sm italic text-blue-300 hover:text-blue-500 transition-colors duration-200 cursor-pointer'
                    to='/login'
                  >
                    Back to Login
                  </NavLink>
                </div>
            </div>
        </div>
      </div>
  )
}

export default ResetPassword