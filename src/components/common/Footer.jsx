import React from 'react'
import { useNavigate } from 'react-router-dom';

// components
import { IconBtn } from './IconBtn';
import { useSelector } from 'react-redux';

// utility functions
import { navigateToRoute } from '../../utils/routeNavigator';

// images
import logo from '../../assets/footer/logo.jpeg';

// icons
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from 'react-icons/md';

const Footer = () => {

  const navigate = useNavigate();
  const {token} = useSelector(state => state.auth);


  return (
    <footer className='py-10 bg-[#2F2F2F] text-[#9d9d9d] z-[50]'>
      <div className='w-11/12 mx-auto'>

        {/* Quote and get started button */}
        <div className='pb-12 flex flex-col md:flex-row justify-between items-center md:items-baseline space-y-5 text-center md:text-start border-b border-b-[#ec8e4f]'>
          {/* quote */}
          <div className='text-4xl flex flex-col gap-2'>
            <p className='text-[#FD6A16]'>Experience Traditional Herbal Wisdom</p>
            <p>with Cutting-Edge Technology</p>
          </div>

          {/* login button*/}
          <div className='w-fit'>
            <IconBtn
              text="Get Started"
              customPadding='px-10 py-4'
              onClick={() => {
                  token 
                  ? navigateToRoute(navigate, '/dashboard/my-profile')
                  : navigateToRoute(navigate, '/login')
                }
              }
            />
          </div>
        </div>

        {/* links section */}
        <div className='mt-12 flex flex-col md:flex-row justify-between gap-10'>
        
          {/* social links */}
          <div className='flex flex-col gap-4 md:w-1/3'>
              {/* logo */}
              <div className='flex gap-2 items-center justify-start'>
                <img src={logo} className='h-10 rounded-full'/>
                <p className='text-2xl font-bold'>VHerbs</p>
              </div>

              {/* text */}
              <div>
                <p>Whether you're just curious or deeply passionate, we're here to grow with you</p>
              </div>
              
              {/* social links */}
              <div>
                {/* social links logos */}
                <div className='mt-2 flex gap-4'>

                    {/* instagram */}
                    <a 
                        href="#"
                        className='p-2 border-1 border-[#9d9d9d] rounded-full hover:text-white hover:border-white transition-all duration-300'
                    >
                        <FaInstagram size={20}/>
                    </a>

                    {/* linkedin */}
                    <a 
                        href="#"
                        className='p-2 border-1 border-[#9d9d9d] rounded-full hover:text-white hover:border-white transition-all duration-300'
                    >
                        <FaLinkedinIn size={20}/>
                    </a>

                    {/* X-twitter */}
                    <a 
                        href="#"
                        className='p-2 border-1 border-[#9d9d9d] rounded-full hover:text-white hover:border-white transition-all duration-300'
                    >
                        <FaXTwitter size={20}/>
                    </a>

                    {/* facebook */}
                    <a 
                        href="#"
                        className='p-2 border-1 border-[#9d9d9d] rounded-full hover:text-white hover:border-white transition-all duration-300'
                    >
                        <FaFacebookF size={20}/>
                    </a>
                    
                </div>
              </div>
          </div>

          {/* quick menu */}
          <div className='md:w-1/3'>
              {/* heading */}
              <div>
                <p className='text-2xl'>Quick Menu</p>
              </div>
              
              {/* links */}
              <div className='mt-5 flex items-center flex-wrap gap-5 md:gap-10 md:grid md:grid-cols-2'>
                  {/* home */}
                  <div>
                    <button
                      className='cursor-pointer hover:text-white transition-all duration-300' 
                      onClick={() => navigateToRoute(navigate, '/')}
                    >
                        Home
                    </button>
                  </div>
                  
                  {/* explore herbs */}
                  <div>
                    <button
                      className='cursor-pointer hover:text-white transition-all duration-300' 
                      onClick={() => navigateToRoute(navigate, '/herbs')}
                    >
                      Explore
                    </button>
                  </div>

                  {/* about us */}
                  <div>
                    <button
                      className='cursor-pointer hover:text-white transition-all duration-300' 
                      onClick={() => navigateToRoute(navigate, '/about-us')}
                    >
                      About us
                    </button>
                  </div>
                  
                  {/* contact us */}
                  <div>
                    <button
                      className='cursor-pointer hover:text-white transition-all duration-300' 
                      onClick={() => navigateToRoute(navigate, '/contact')}
                    >
                      Contact us
                    </button>
                  </div>
              </div>
          </div>

          {/* contact details */}
          <div className='flex flex-col gap-4'>
            {/* address */}
            <div className='md:mt-5 flex gap-4 items-center'>
                {/* icon */}
                <div>
                    <FaLocationDot size={25}/>
                </div>

                {/* address */}
                <div>
                    <p>Address</p>
                    <p className='text-sm'>Speke Rd, Kampala Capital City Uganda</p>
                </div>
            </div>

            {/* email address */}
            <div className='flex gap-4 items-center'>
                {/* icon */}
                <div>
                    <MdEmail size={25}/>
                </div>
                
                {/* email */}
                <div>
                    <p>E-Mail</p>
                    <p className='text-sm'>ouremail@gmail.cm</p>
                </div>
            </div>
          </div>

        </div>

        {/* copyright */}
        <div className='mt-12 text-center text-[#7f7e7e]'>
          <p>&copy; 2025 VHerbs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer