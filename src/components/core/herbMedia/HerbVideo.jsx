import React from 'react'
import ReactPlayer from 'react-player'

const HerbVideo = ({video}) => {
  return (
    <div className='h-full'>
      {
         video ? (
            <div>
                <ReactPlayer 
                  height="100%" 
                  width="100%" 
                  controls={true} 
                  playsinline={true}
                  url={video}
                />
            </div>
         ) : (
          <div
            className='w-full h-full flex justify-center items-center text-2xl sm:text-3xl text-center tracking-widest bg-[#DDDDDD]'
          >
              Video will be uploaded soon! <br/> Stay tuned :)
          </div>
         )
      }
    </div>
  )
}

export default HerbVideo;