import React from 'react'

// icons
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const AboutAndStats = () => {
  return (
    <>
        {/* highlighted text */}
        <div className='w-11/12 max-w-[1280px] mx-auto'>
            <div className='w-11/12 mx-auto text-[#edf6f9]'>
                <div className='mt-10 w-[85%] mx-auto flex flex-col leading-10 gap-2 justify-center items-center text-center text-2xl md:text-3xl font-bold tracking-wider'>
                    <p>
                        <FaQuoteLeft size={18} className='inline -mt-8 mr-2'/>
                        We are passionate about transforming the way people learn about medicinal plants.
                    </p>

                    <p>
                        By {" "}
                        <span className='bg-linear-to-r from-yellow-200 via-amber-400 to-orange-600 text-transparent bg-clip-text'>
                            blending traditional herbal wisdom with modern technology
                        </span>
                        , we create an engaging and immersive learning experience.
                        <FaQuoteRight size={18} className='inline -mt-6 ml-1'/>
                    </p>
                </div>
            </div>
        </div>
        
        {/* about us & stats */}
        <div className='w-[75%] mx-auto text-[#edf6f9]'>
            <div className='mt-20 flex flex-col sm:flex-row items-center gap-8 '>
                {/* left photo */}
                <div className='relative rounded-2xl h-[300px] bg-[#83c5be] w-full sm:w-[40%]'>
                    <img src='https://www.blogtyrant.com/wp-content/uploads/2011/02/best-about-us-pages.png' className='w-full h-full object-cover rounded-xl'/>
                </div>

                {/* right content */}
                <div className='w-full sm:w-[60%]'>
                    {/* about us */}
                    <div>
                        <p className='text-3xl font-bold tracking-wider font-sans text-[#1c1e2f]'>
                            About us
                        </p>
                        <p className='mt-2 tracking-wide'>
                            VHerb is a cutting-edge platform designed to bring the rich world of medicinal plants to your fingertips. Our mission is to make the knowledge of traditional healing practices, rooted in the AYUSH system, accessible to everyone. Through immersive 3D models and engaging multimedia content, we aim to educate, inspire, and promote the healing power of nature.
                        </p>
                    </div>

                    {/* stats */}
                    <div className='mt-4 font-sans grid grid-cols-1 sm:grid-cols-3 mx-auto gap-6 text-[1.65rem] text-[#2b2d42] font-bold tracking-wider'>
                        {/* total herbs */}
                        <div className='flex flex-col bg-[#e29578] rounded-xl items-center justify-center p-6 sm:p-8'>
                            <p>1K+</p>
                            <p className='text-sm font-semibold'>Medicinal Plants</p>
                        </div>

                        {/* total models */}
                        <div className='flex flex-col bg-[#e29578] rounded-xl items-center justify-center p-6 sm:p-8'>
                            <p>500+</p>
                            <p className='text-sm font-semibold'>3D Models</p>
                        </div>

                        {/* daily visitors */}
                        <div className='flex flex-col bg-[#e29578] rounded-xl items-center justify-center p-6 sm:p-8'>
                            <p>200+</p>
                            <p className='text-sm font-semibold'>Daily Visitors</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AboutAndStats