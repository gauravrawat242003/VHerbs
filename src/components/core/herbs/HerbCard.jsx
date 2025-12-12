import React from 'react'
import { useNavigate } from 'react-router-dom'

// icons
import { Md3dRotation } from "react-icons/md";
import { CiVideoOn, CiImageOn, CiBookmark, CiHeart } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";

// utility functions
import { navigateToRoute } from '../../../utils/routeNavigator';


const HerbCard = ({herb}) => {
    const navigate = useNavigate();

    // to display max number of herb uses in card
    const max_use_render_count = 2;
    
    // total uses of herb
    const total_use_count = JSON.parse(herb.uses).length;

  return (
    <>
        <div 
            className='w-[350px] h-[390px]  p-2 outline-[#d2deef] outline-2 rounded-lg flex flex-col gap-2 cursor-pointer hover:scale-[1.04] hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all duration-300'
            onClick={() => {
                navigateToRoute(navigate, `/herbs/${herb._id}`);

            }}
        >
            {/* Image and herb details */}
            <div className='h-[90%] w-full flex flex-col gap-2'>
                {/* image */}
                <div className='w-full h-[60%]'>
                    <img 
                        src={herb.image} 
                        alt={`${herb.commonName} photo`} 
                        loading='lazy'
                        className='rounded-lg w-full h-full object-cover'
                    />
                </div>

                {/* herb details */}
                <div className='mx-2 flex flex-col gap-2'>
                    {/* botanical & common name */}
                    <div className='flex flex-col -space-y-1'>
                        <p className='text-lg tracking-wide font-semibold'>{herb.botanicalName}</p>
                        <p className='tracking-wider'>{herb.commonName}</p>
                    </div>

                    {/* uses */}
                    <div className='flex gap-2 flex-wrap items-center text-sm tracking-wider'>
                        {/* display uses */}
                        {
                            JSON.parse(herb.uses).slice(0,max_use_render_count).map((item, index) => (
                                <span 
                                    key={index}
                                    className='outline-1 outline-[#2D9CF4] px-1 py-[2px] rounded-md bg-[#e0fff3]'
                                >
                                    {item.use}
                                </span>
                                
                            ))

                        }

                        {/* +uses count */}
                        {
                            total_use_count > max_use_render_count && (
                                <span className='flex items-center mt-1 font-semibold'>
                                    <FiPlus/>
                                    {total_use_count-max_use_render_count}
                                </span>
                            )
                        }
                    </div>

                    {/* herb media icons */}
                    <div className='mt-1 flex space-x-2 items-center'>
                        {
                            herb.model && <Md3dRotation size={25}/>
                        }
                        {
                            herb.video && <CiVideoOn size={25}/>
                        }
                        {
                            herb.image && <CiImageOn size={25}/>
                        }
                    </div>
                   
                </div>
            </div>

             {/* bookmarks and likes count */}
             <div className='mx-2 flex justify-between items-center'>
                {/* bookmarks */}
                <p className={`flex gap-1 items-center text-sm `}>
                    <CiBookmark size={25}/>
                    {herb.bookmarks.length}
                </p>
                
                {/* likes */}
                <p className='flex gap-1 items-center text-sm'>
                    <CiHeart size={25}/>
                    {herb.likes.length}
                </p>
            </div>

        </div>
    </>
  )
}

export default HerbCard