import React from 'react'

// images
import hero_image_1 from '../../../assets/about/hero-image-1.jpeg'
import hero_image_2 from '../../../assets/about/hero-image-2.jpeg'
import hero_image_3 from '../../../assets/about/hero-image-3.jpeg'

const HeroSection = () => {
  return (
    <>
        {/* heading & description */}
        <div className='w-11/12 max-w-[1280px] mx-auto'>
            {/* highlighted headling*/}
            <div className='mt-10 flex flex-col justify-center items-center text-center text-2xl md:text-3xl font-bold'>
                <p className='tracking-wider'>Bridging Tradition and Technology to</p>
                <p className='tracking-wider bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-transparent bg-clip-text'>Empower Herbal Wisdom</p>
            </div>

            {/* description */}
            <div className='mt-4 flex justify-center'>
                <p className='w-full md:w-[80%] lg:w-[60%] text-center text-[1.12rem] tracking-wide'>
                    Step into the future of herbal learning with VHerbs — your digital gateway to the ancient wisdom of medicinal plants. From casual explorers to passionate practitioners, we empower every journey with intuitive tools, 3D visuals, and AI-powered guidance rooted in the AYUSH tradition.
                </p>
            </div>

        </div>
    
        {/* images */}
        <div className='w-11/12 mx-auto mt-14 -mb-20'>
            <div className='flex justify-center'>
                <div className='flex justify-center gap-4'>
                    <img src={hero_image_1} className='w-[30%] max-w-[400px]'/>
                    <img src={hero_image_2} className='w-[30%] max-w-[400px]'/>
                    <img src={hero_image_3} className='w-[30%] max-w-[400px]'/>
                </div>
            </div>

        </div>
    </>
  )
}

export default HeroSection