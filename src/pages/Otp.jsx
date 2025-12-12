import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { InputOtp } from 'primereact/inputotp';

// icons
import { FaArrowLeftLong } from "react-icons/fa6";

// APIs
import { sendOtp, signup } from '../services/operations/authAPIs';

// maximum time after we can resend otp
const OTP_RESEND_TIMER_SECONDS = 30;

const Otp = () => {

    const {signupData} = useSelector((state) => state.auth);
    const [otp, setOtp] = useState('');
    const [resendTime, setResendTime] = useState(OTP_RESEND_TIMER_SECONDS);
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    // function to validate otp
    const handleOtpSubmit = async () => {
        if(otp.length !== 6) {
            toast.error("Enter a valid OTP");
            return;
        }

        setLoading(true);

        const accountType = "user";
        const formData = {...signupData, otp, accountType};
        // console.log("Logging formData: ",formData);
        
        await signup(formData, navigate);

        setLoading(false);
    }

    // function to re-send otp
    const resendOtpHandler = async () => {
        setLoading(true);
        await sendOtp(signupData);
        setLoading(false);
    }

    // handle time decreament for resending otp
    useEffect(() => {
        if(resendTime >= 1) {
            setTimeout(() => {
                setResendTime((prev) => prev - 1);
            }, 1000);
        }
    }, [resendTime])

  return (
    <main>
        <div className='h-screen w-11/12 max-w-[1280px] mx-auto flex flex-col justify-center items-center'>

            <div className='border-[1px] border-[#766CDD] rounded-lg p-4 lg:p-8'>

                {/* heading */}
                <div className='relative text-center flex gap-4 items-center justify-center'>
                    <div 
                        className='absolute left-0 cursor-pointer rounded-full hover:bg-[#dadada] transition-all duration-200'
                        onClick={() => navigate('/signup')}
                    >
                        <FaArrowLeftLong 
                            size={20} 
                        />
                    </div>
                    <p className='text-3xl font-semibold'>Verify your email</p>
                </div>

                {/* text */}
                <div className='mt-14 w-full flex justify-center items-center'>
                    <p className='text-xl font-semibold text-center w-[60%]'>
                        We sent you a code to verify your email address
                    </p>
                </div>

                {/* otp input */}
                <div className='mt-4 flex items-center justify-center'>
                    <InputOtp 
                        integerOnly
                        value={otp} 
                        length={6}
                        onChange={(e) => setOtp(e.value)} 
                    />
                </div>

                {/* resend option */}
                <div className='mt-4 flex items-center justify-center gap-1 text-sm'>
                    <p className='text-richblack-400 font-semibold'>Didn't receive ?</p>

                    <button 
                        className='text-[#746DDF] font-bold' 
                        onClick={resendOtpHandler}
                        disabled={resendTime !== 0}
                    >
                        {
                            resendTime !== 0 ? (
                                <p>
                                    Resend in 00:{resendTime.toString().padStart(2, '0')}
                                </p>
                            )
                            : (
                                <p className='cursor-pointer hover:text-[#4c43d6] transition-all duration-300'>
                                    Resend OTP
                                </p>
                            )
                        }

                        
                    </button>
                </div>
                
                {/* submit button */}
                <div className='mt-14 flex items-center justify-center gap-2'>
                    <button
                        onClick={handleOtpSubmit}
                        className='bg-[#766CDD] hover:bg-[#4c43d6] text-white py-2 w-full rounded-full cursor-pointer transition-all duration-300'
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </main>

  )
}

export default Otp