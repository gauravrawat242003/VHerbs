import React from 'react'

const HerbCardSkeleton = () => {
  return (
    <div className="w-[350px] h-[390px] p-2 border-2 border-[#d2deef] rounded-lg flex flex-col gap-2 cursor-pointer animate-pulse">
        {/* <!-- Image and herb details skeleton--> */}
        <div className="h-[90%] w-full flex flex-col gap-2">
        {/* <!-- image skeleton --> */}
        <div className="w-full h-[60%] bg-gray-200 rounded-lg"></div>
        
        {/* <!-- herb details skeleton-->   */}
        <div className="mx-2 flex flex-col gap-2">
            {/* <!-- botanical & common name skeleton--> */}
            <div className="flex flex-col space-y-1">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>

            {/* <!-- uses skeleton--> */}
            <div className="flex space-x-2 flex-wrap items-center text-sm tracking-wider">
            <div className="h-4 bg-gray-200 rounded px-4 py-[2px]"></div>
            <div className="h-4 bg-gray-200 rounded px-8 py-[2px]"></div>
            <div className="h-4 bg-gray-200 rounded px-6 py-[2px]"></div>
            </div>

            {/* <!-- herb media icons skeleton --> */}
            <div className="mt-1 flex space-x-2 items-center">
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            </div>
        </div>  
        </div>
        
        {/* <!-- bookmarks and likes count skeleton--> */}
        <div className="mx-2 flex justify-between items-center">
        {/* <!-- bookmarks skeleton--> */}
        <div className="h-6 w-1/4 flex gap-1 items-center bg-gray-200 rounded"></div>
        
        {/* <!-- likes skeleton--> */}
        <div className="h-6 w-1/4 flex gap-1 items-center bg-gray-200 rounded"></div>
        </div>
    </div>
  )
}

export default HerbCardSkeleton