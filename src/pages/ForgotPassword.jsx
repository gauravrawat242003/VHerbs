import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// icons
import { PiLockKeyLight } from "react-icons/pi";

// compnents
import { IconBtn } from '../components/common/IconBtn';

// APIs
import { resetPasswordToken } from '../services/operations/authAPIs';

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // will be used to render different text on submit button
  const [emailSent, setEmailSent] = useState(false);

  // function to handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    setLoading(true);

    // call API
    const result = await resetPasswordToken(email)
    if(result) {
      setEmailSent(true);
    }

    setLoading(false);
  }

  return (
    <main>
      <div className='py-20 min-h-screen w-11/12 mx-auto flex justify-center items-center'>
        <form 
          className='flex flex-col gap-8 p-8 py-10 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]' 
          onSubmit={handlePasswordReset}
        >   
             {/* Heading */} 
            <div>
                <div className='flex justify-center text-red-500 '>
                  <PiLockKeyLight size={50}/>
                </div>

                {/* heading */}
                <div className='font-semibold text-3xl text-richblack-400 text-center'>
                    <h2>Reset Password</h2>
                </div>
            </div>

            {/* form */}
            <div className='flex flex-col gap-4'>
                {/* email input */}
                <div>
                  <label htmlFor='email'>Email Address<sup className='text-red-500'>*</sup></label>
                  <input
                    type='email'
                    id='email'
                    required={true}
                    placeholder='Enter your email address'
                    onChange={(e) => setEmail(e.target.value)}
                    className='form-input'
                  />
                </div>

                {/* button */}
                <div className='flex justify-between items-center'>
                {
                  !emailSent ? (
                    <IconBtn
                      text="Reset Password"
                      disabled={loading}
                  />
                  ) : (
                    <IconBtn
                      text="Resend Email"
                      disabled={loading}
                  />
                  )
                }

                  <p 
                    className='text-sm italic text-blue-300 hover:text-blue-500 transition-colors duration-200 cursor-pointer'
                    onClick={() => navigate('/login')}  
                  >
                    Back to Login
                  </p>
                </div>
            </div>
        </form>
      </div>

    </main>
  )
}

export default ForgotPassword