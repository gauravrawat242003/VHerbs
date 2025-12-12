import React from 'react'

const HerbImage = ({image}) => {
  return (
    <div className='sm:h-full rounded-lg overflow-hidden'>
        <img 
            src={image} 
            alt='Herb Image'
            loading='lazy'
            className='h-full w-full object-cover'
        />
    </div>
  )
}

export default HerbImage;