import React from 'react'
import Marquee from "react-fast-marquee";
import { Canvas } from "@react-three/fiber";
import { Loader } from '@react-three/drei';
import { Suspense } from "react";

// components
import Experience from "../components/core/home/Experience";
import UI from "../components/core/home/UI";
import ClickSpark from '../components/common/ClickSpark';


const Home = () => {
  
  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >

      {/* following cursor */}
      <div className='opacity-70'>
        
      </div>
      

      <div style={{background: 'radial-gradient(#5a47ce, #232323 80%)', height: '100vh',}}>
          <div className='h-full relative'>

            {/* book naviation buttons */}
            <UI/>

            {/* book */}
            <Loader/>
            <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }} style={{zIndex: '20'}}>
              <group position-y={0}>
                <Suspense fallback={null}>
                  <Experience />
                </Suspense>
              </group>
            </Canvas>

              {/* animated text */}
              <div className='absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
                <Marquee speed={80}>
                  <div 
                    className='capitalize text-[4rem] sm:text-[7rem] md:text-[9rem] lg:text-[10rem] flex gap-20 overflow-hidden select-none ml-20'
                    style={{WebkitTextFillColor: 'transparent', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: '#F3B081'}}  
                  >
                    <p className='select-none'>VHerbs</p>
                    <p className='select-none'>Rooted in Tradition, Powered by Tech</p>
                    <p className='select-none'>Discover Herbal Wisdom</p>
                    <p className='select-none'>Experience 3D Herbal Models</p>
                    <p className='select-none'>Learn with Ayu AI</p>
                  </div>
                </Marquee>
              </div>
          </div>
      </div>
    </ClickSpark>
  )
}

export default Home