import React from 'react'

// components
import HeroSection from '../components/core/aboutus/HeroSection';
import AboutAndStats from '../components/core/aboutus/AboutAndStats';
import MissionAndVision from '../components/core/aboutus/MissionAndVision';
import OurTeam from '../components/core/aboutus/OurTeam';
import Contact from '../components/core/aboutus/Contact';


const AboutUs = () => {

  return (
    <div className='pt-10 md:pt-14 bg-[#edf6f9] text-[1.12rem]'>
        {/* hero section */}
        <section>
            <HeroSection/>
        </section>

        {/* about us & stats */}
        <section className='bg-[#006d77]  pt-28 pb-20'>
            <AboutAndStats/>
        </section>

        {/* mission and vision */}
        <section>
            <MissionAndVision/>
        </section>

        {/* our team */}
        <section>
            <OurTeam/>
        </section>

        {/* contact us */}
        <section className='bg-[#006d77] text-white'>
            <Contact/>
        </section>
        
    </div>
  )
}

export default AboutUs