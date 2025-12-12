import React from 'react'

const NoteSkeleton = () => {
  return (
    <div className="animate-pulse">
        <div className="p-8 rounded-xl bg-gray-200 text-gray-500">
            <div className="pb-4 border-b-2 border-gray-400 flex flex-col gap-2">
                {/* herb details */}
                <div className="flex items-center justify-between">
                    {/* herb name */}
                    <div>
                        <div className="h-5 bg-gray-300 rounded w-32"></div>
                        <div className="mt-2 h-4 bg-gray-300 rounded w-28"></div>
                    </div>

                    {/* herb photo */}
                    <div className="h-16 w-16 rounded-md bg-gray-300"></div>
                </div>
                
                {/* action icons */}
                <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-lg bg-gray-300"></div>
                    <div className="h-8 w-8 rounded-lg bg-gray-300"></div>
                </div>
            </div>
            
            {/* note content */}
            <div className="mt-4 h-36 bg-gray-300 rounded"></div>

            {/* dates */}
            <div className="mt-4 text-sm">
                <div className="h-4 bg-gray-300 rounded w-[60%]"></div>
                <div className="mt-2 h-4 bg-gray-300 rounded w-[60%]"></div>
            </div>
        </div>
    </div>

  )
}

export default NoteSkeleton