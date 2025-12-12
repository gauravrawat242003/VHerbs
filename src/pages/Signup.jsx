import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { setSignupData } from '../slices/authSlice';

// prime react components
import { Dialog } from 'primereact/dialog';
        
// API's
import { sendOtp } from '../services/operations/authAPIs';

// data for terms & conditions
const termsAndConditions = [
  {
    id: 1,
    heading: 'Use of Platform',
    description: 'By signing up, you agree to use VHerbs solely for educational and informational purposes related to medicinal plants and traditional healing systems under AYUSH.',
  },
  {
    id: 2,
    heading: 'Account Responsibility',
    description: 'You are responsible for maintaining the confidentiality of your account and agree not to share login credentials with others.',
  },
  {
    id: 3,
    heading: 'Content Usage',
    description: 'All 3D models, plant information, images, and multimedia content on VHerbs are protected by intellectual property rights and must not be copied, redistributed, or used for commercial purposes without permission.',
  },
  {
    id: 4,
    heading: 'Data Privacy',
    description: 'We collect basic user information to enhance your experience. Your data will not be shared with third parties without consent.',
  },
  {
    id: 5,
    heading: 'AI Assistance',
    description: 'Responses from Ayu AI are for informational purposes only and should not be considered medical advice.',
  },
  {
    id: 6,
    heading: 'Changes to Terms',
    description: 'VHerbs reserves the right to update these terms. Continued use of the platform after changes implies your acceptance.',
  },
]


const Signup = () => {

  const {
    register,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm();

  // terms and conditions dialog box
  const [displayTACDialog, setDisplayTACDialog] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // call singup API
  const signupSubmitHandler = async (formData) => {
    setLoading(true);

    const password = getValues('password');
    const confirmPassword = getValues('confirmPassword');

    if(password !== confirmPassword) {
      toast.error("Both password must be same");
      return;
    }

    // this data will be used to call signup api when we give otp
    dispatch(setSignupData(formData));

    // call send otp api
    const success = await sendOtp(formData);

    // navigate to otp input route
    if(success) {
      navigate('/signup/otp');
    }

    setLoading(false);
  }

  return (
    <main>
      <div className='mt-14 pb-10 w-11/12 max-w-[800px] mx-auto min-h-screen flex justify-center items-center'>

        <div 
          className='w-fit flex flex-col-reverse md:flex-row items-stretch justify-center gap-8 rounded-lg overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'
        >
        
          {/* left section */}
          <div className='flex flex-col justify-center gap-8 w-full md:w-1/2 bg-[#019875] text-white py-8 pl-8 pr-4'>
            <div className='flex flex-col gap-2'>
              <p className='text-lg md:text-xl'>Create your account</p>
              <p className='text-sm'>Welcome to VHerbs! Get started by creating your account.</p>
            </div>
            
            <div className='flex flex-col gap-2'>
              <p className='text-lg md:text-xl'>Simple & Secure Registration</p>
              <p className='text-sm'>Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
            </div>

          </div>

          {/* right section - form */}
          <div className='w-full flex justify-center h-fit'>
            <form 
              onSubmit={handleSubmit(signupSubmitHandler)}
              className='w-full max-w-[500px] px-6 py-8 rounded-lg flex flex-col gap-4'
            >
                {/* first name */}
                <div className='w-[97%]'>
                  <label htmlFor='firstName'>First name<sup className='text-red-500'>*</sup></label>

                  <input
                    type='text'
                    id='firstName'
                    placeholder='Enter first name'
                    {...register('firstName', {required:true})}
                    className='form-input'
                  />
                  {errors.firstName && <span className='text-red-400 text-sm'>First name is required</span>}
                </div>

                {/* last name */}
                <div className='w-[97%]'>
                    <label htmlFor='lastName'>Last name</label>

                    <input
                      type='text'
                      id='lastName'
                      placeholder='Enter last name'
                      {...register('lastName')}
                      className='form-input'
                    />
                </div>

                {/* email */}
                <div className='w-[97%]'>
                    <label htmlFor='email'>Email<sup className='text-red-500'>*</sup></label>

                    <input
                      type='email'
                      id='email'
                      placeholder='Enter your email'
                      {...register('email', {required:true})}
                      className='form-input'
                    />
                    {errors.email && <span className='text-red-400 text-sm'>Email is required</span>}
                </div>

                {/* password */}
                <div className='w-[97%]'>
                    <label htmlFor='password'>Password<sup className='text-red-500'>*</sup></label>

                    <input
                      type='password'
                      id='password'
                      placeholder='Enter your password'
                      {...register('password', {required:true})}
                      className='form-input'
                    />
                    {errors.password && <span className='text-red-400 text-sm'>Password is required</span>}
                </div>

                {/* confirm password */}
                <div className='w-[97%]'>
                    <label htmlFor='confirmPassword'>Confirm Password<sup className='text-red-500'>*</sup></label>

                    <input
                      type='password'
                      id='confirmPassword'
                      placeholder='Confirm your password'
                      {...register('confirmPassword', {required:true})}
                      className='form-input'
                    />
                    {errors.confirmPassword && <span className='text-red-400 text-sm'>Confirm password is required</span>}
                </div>

                {/* terms and condtions */}
                <div className='flex flex-col'>
                  <div className='flex items-center'>
                    <input 
                      type='checkbox'
                      id='termsAndC'
                      checked={isChecked}
                      onChange={() => setIsChecked(prev => !prev)}
                      className='h-4 w-4'
                    />
                    
                    <label htmlFor='termsAndC' className="ml-2 text-richblack-400 text-sm tracking-wide">
                        I accept the {" "}
                        <span 
                          onClick={(e) => {
                            e.preventDefault();
                            setDisplayTACDialog(true);
                          }}
                          className='text-[#4c82f5] hover:underline underline-offset-3 cursor-pointer font-[600]'
                        >
                          Terms and Conditions
                        </span>
                        <sup className='text-red-500'>*</sup>
                    </label>
                  </div>

                  {
                    !isChecked && (<span className='text-red-400 text-sm'>Plese check the box</span>)
                  }
                </div>

                {/* submit button */}
                <div className='mt-2'>
                    <button
                      disabled={loading}
                      type='submit'
                      className='w-full cursor-pointer bg-[#16a34a] hover:bg-[#15803D] focus:outline-3 outline-green-300 text-white py-2 rounded-lg transition-all duration-300'
                    >
                      Signup
                    </button>
                </div>

                {/* login link */}
                <div>
                  <p className='mt-2 text-sm tracking-wide text-richblack-400 text-center'>
                    Already have an account?
                    <span 
                      className='ml-2 text-[#4c82f5] hover:underline underline-offset-3 cursor-pointer font-[600]'
                      onClick={() => navigate('/login')}
                    >
                      Login here
                    </span>
                  </p>
                </div>

            </form>
          </div>
          
        </div>
      </div>
      
      {/* terms and conditions dialog box */}
      {
        displayTACDialog && (
          <Dialog 
            header="Terms and Conditions" 
            draggable={false}
            visible={displayTACDialog} 
            // style={{ width: '80vw', height: '60vh' }} 
            onHide={() => {
              if (!displayTACDialog) return; 
              setDisplayTACDialog(false); 
              }}
            className='w-[80vw] md:w-[60vw] h-[60vh]'
            >
              <div className='flex flex-col gap-4 text-richblack-400'>
                {
                  termsAndConditions.map((item) => (
                    <div key={item.id}>
                      <h4 className='font-bold text-lg text-richblack-600'>{item.id}.{" "}{item.heading}</h4>
                      <p>{item.description}</p>
                    </div>
                  ))
                }
              </div>
        </Dialog>
        )
      }
    
    </main>
  )
}

export default Signup