import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

// prime react components
import { InputText } from "primereact/inputtext";
import { FloatLabel } from 'primereact/floatlabel';
import { InputTextarea } from 'primereact/inputtextarea';

// icons
import { IoLocationOutline, IoCallOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
        
// images
import contact_banner from '../assets/contact/banner.jpg'

// APIs
import { contactUs } from '../services/operations/contactAPI';


const ContactUs = () => {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        // call API
        const result = await contactUs(data);

        // clear form data
        if(result) {
            reset();
        }

        setLoading(false);
    }

  return (
    <div className='pt-12 md:pt-14 pb-32 min-h-screen max-h-auto bg-[#f4fdf9]'>

        {/* banner image */}
        <section className='pt-6 pb-4 md:pt-10 md:pb-8'>
            <div className='w-11/12 max-w-[1280px] mx-auto rounded-xl overflow-hidden'>
                <div className='relative w-full h-[25vh] sm:h-[30vh] md:h-[45vh]'>
                    <img src={contact_banner} className='w-full h-full'/>
                </div>
            </div>
        </section>


        {/* contact us form container */}
        <section className='mt-20'>
            <div className='w-11/12 max-w-[1280px] mx-auto flex flex-col md:flex-row gap-12'>
            
                {/* left container */}
                <div className='w-full h-fit md:w-1/2 p-8 bg-[#effef7] border-1 border-[#7ce9b9] rounded-lg text-richblack-700'>

                    {/* heading */}
                    <div>
                        <h3 className='text-3xl md:text-4xl font-semibold text-richblack-500'>
                            We are always ready to help you and answer your questions
                        </h3>
                    </div>

                    {/* our contact details */}
                    <div className='mt-6 py-6 space-y-4 border-b-1 border-b-[#7ce9b9]'>  
                        {/* address */}
                        <div className='flex gap-4 items-center'>
                            {/* icon */}
                            <div className='p-2 bg-[#98E209] rounded-full text-white'>
                                <IoLocationOutline size={25}/>
                            </div>

                            {/* address */}
                            <div>
                                <p className='font-semibold'>Address</p>
                                <p className='text-sm'>Speke Rd, Kampala Capital City Uganda</p>
                            </div>
                        </div>

                        {/* contact number */}
                        <div className='flex gap-4 items-center'>
                            {/* icon */}
                            <div className='p-2 bg-[#98E209] rounded-full text-white'>
                                <IoCallOutline size={25}/>
                            </div>

                            {/* number */}
                            <div>
                                <p className='font-semibold'>Phone Number</p>
                                <p className='text-sm'>+91 1234567890</p>
                            </div>
                        </div>

                        {/* email address */}
                        <div className='flex gap-4 items-center'>
                            {/* icon */}
                            <div className='p-2 bg-[#98E209] rounded-full text-white'>
                                <MdOutlineMailOutline size={25}/>
                            </div>
                            
                            {/* email */}
                            <div>
                                <p className='font-semibold'>E-Mail</p>
                                <p className='text-sm'>ouremail@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* social links */}
                    <div className='mt-6'>
                        <p className='font-semibold'>Follow Us</p>

                        {/* social links logos */}
                        <div className='mt-2 flex gap-4'>

                            {/* instagram */}
                            <a 
                                href="https://www.instagram.com/ps_prad_eep/"
                                target="_blank" 
                                className='p-2 bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full hover:scale-125 transition-all duration-300'
                            >
                                <FaInstagram size={25}/>
                            </a>

                            {/* linkedin */}
                            <a 
                                href="https://www.linkedin.com/in/pradeep-singh-b300362b3/"
                                target="_blank" 
                                className='p-2 bg-[#0A66C2] text-white rounded-full hover:scale-125 transition-all duration-300'
                            >
                                <FaLinkedinIn size={25}/>
                            </a>

                            {/* X-twitter */}
                            <a 
                                href="#"
                                className='p-2 bg-[#080808] text-white rounded-full hover:scale-125 transition-all duration-300'
                            >
                                <FaXTwitter size={25}/>
                            </a>

                            {/* facebook */}
                            <a 
                                href="#"
                                className='p-2 bg-[#1877F2] text-white rounded-full hover:scale-125 transition-all duration-300'
                            >
                                <FaFacebookF size={25}/>
                            </a>
                            
                        </div>
                    </div>
                </div>

                {/* Right container */}
                <div className='w-full md:w-1/2 p-8 bg-[#f9f6fc] border-1 border-[#b698e1] rounded-lg'>

                    {/* heading */}
                    <div>
                        <p className='text-3xl md:text-4xl font-semibold text-center text-richblack-500'>
                        Got a technical issue? Want to send feedback? Let us know.
                        </p>
                    </div>

                    {/* form */}
                    <div className='mt-12 w-[90%]'>
                        <form 
                            onSubmit={handleSubmit(onSubmit)} 
                            className='flex flex-col gap-8'
                        >

                            {/* Name */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>

                                {/* first name */}
                                <div>
                                    <FloatLabel>
                                        <label htmlFor="firstName">First Name</label>
                                        <InputText 
                                            id="firstName" 
                                            {...register("firstName", { required: true })}
                                            className='form-input'
                                        />
                                    </FloatLabel>

                                    {/* error message */}
                                    <div>
                                        {errors.firstName && (
                                            <span className='text-red-400 text-sm'>First name is required</span>
                                        )}
                                    </div>
                                </div>
                                
                                {/* last name */}
                                <div>
                                    <FloatLabel>
                                        <label htmlFor="lastName">Last Name</label>
                                        <InputText 
                                            id="lastName" 
                                            {...register("lastName")}
                                            className='form-input'
                                        />
                                    </FloatLabel>
                                </div>

                            </div>
                            
                            {/* email address */}
                            <div>
                                <div>
                                    <FloatLabel>
                                        <label htmlFor="email">Email address</label>
                                        <InputText 
                                            id="email" 
                                            type='email'
                                            {...register("email", { required: true })}
                                            className='form-input'
                                        />
                                    </FloatLabel>
                                </div>

                                {/* error message */}
                                <div>
                                    {errors.email && (
                                        <span className='text-red-400 text-sm'>Email is required</span>
                                    )}
                                </div>
                            </div>


                            {/* message */}
                            <div >
                                <div>
                                    <FloatLabel>
                                        <label htmlFor="message">Message</label>
                                        <InputTextarea 
                                            autoResize 
                                            rows={5} 
                                            cols={30} 
                                            id="message"   
                                            {...register("message", {required: true})}
                                            className='form-textarea'
                                        />
                                    </FloatLabel>
                                </div>

                                {/* error message */}
                                <div>
                                    {errors.message && (
                                        <span className='text-red-400 text-sm'>Message is required</span>
                                    )}
                                </div>
                            </div>

                            {/* submit button */}
                            <div>
                                <button 
                                    disabled={loading}
                                    className='flex items-center justify-center py-2 gap-1 bg-gradient-to-r from-[#21D4FD] to-[#B721FF] text-white w-full cursor-pointer rounded-full text-center hover:scale-95 transition-all duration-300'
                                    type='submit'
                                >
                                    <p>Send</p>
                                    <BsArrowRight/>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>  
            </div>
        </section>

    </div>
  )
}

export default ContactUs