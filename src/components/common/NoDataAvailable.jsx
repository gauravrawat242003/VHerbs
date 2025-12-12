import React from 'react'

// images
import NoDataImage from '../../assets/noDataFound/nodata.jpg'

const NoDataAvailable = ({btnText, btnClickHandler}) => {
  return (
    <div className='h-[60vh] flex flex-col justify-center items-center gap-10'>
        {/* image */}
        <div className='mt-20'>
            <img src={NoDataImage} className='mix-blend-multiply h-[60vh] aspect-square'/>
        </div>

        {/* link to other page*/}
        <div>
        {
            btnText && (
                <button 
                    className='button-2'
                    onClick={btnClickHandler}    
                >
                    {btnText}
                </button>
            )
        }
        </div>
    </div>
  )
}

export default NoDataAvailable