import React from 'react'
import { useNavigate } from 'react-router-dom'

// components
import { IconBtn } from '../../common/IconBtn'

// utility functions
import { navigateToRoute } from '../../../utils/routeNavigator'

// images
import line_pattern from '../../../assets/about/pattern.png'

const Contact = () => {
    const navigate = useNavigate();

  return (
    <>
        <div className='w-[75%] max-w-[1280px] mx-auto mt-24 py-32'>

            <div className='relative flex flex-col items-center justify-center text-center p-10 rounded-lg border-[3px] border-[#0A5D7A] '>
                <p className='text-2xl md:text-3xl font-bold tracking-widet'>
                    Got any Issue ? We are here to help
                </p>
                
                <p className='mt-3 text-2xl md:text-3xl font-bold tracking-widest'>
                    Discuss with us
                </p>
                
                {/* button */}
                <div className='mt-7'>
                    <IconBtn 
                        text='Contact Us'
                        type='button'
                        onClick={() => navigateToRoute(navigate, '/contact')}
                    />
                </div>
                
                {/* line patterns */}
                <img 
                    src={line_pattern}
                    className='absolute h-[80px] max-w-[40%] left-0 top-[35%] opacity-35'
                />

                <img 
                    src={line_pattern}
                    className='absolute h-[80px] max-w-[40%] right-0 rotate-180 opacity-35'
                />
            </div>

        </div>
    </>
  )
}

export default Contact