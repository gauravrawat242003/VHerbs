import React from 'react'
import { useSelector } from 'react-redux'

// components
import HerbInformation from './herbInformation';
import HerbMedia from './herbMedia/index';
import PublishHerb from './publishHerb/PublishHerb';

// icons
import { FaCheck } from "react-icons/fa"

export const RenderSteps = () => {

    const {step} = useSelector((state) => state.herb);

    // data for steps
    const steps = [
        {
            id: 1,
            title: "Herb Information",
        },
        {
            id: 2,
            title: "Herb Media",
        },
        {
            id: 3,
            title: "Publish",
        },
    ];

  return (
    <>
        {/* steps number with dotted line */}
        <div className="relative mb-2 flex w-full justify-center">
            {
                steps.map((item) => (
                    <React.Fragment key={item.id}>
                        {/* steps */}
                        <div className='relative flex flex-col items-center'>
                            {/* step number */}
                            <div
                                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px]
                                ${step === item.id 
                                ? 'border-yellow-50 bg-orange-400 text-white' 
                                : step > item.id ? 'bg-[#3BA291] border-white' : 'border-richblack-700 bg-richblack-800 text-richblack-300'}
                                `}
                            >
                                {
                                    step > item.id 
                                    ? (<FaCheck className="font-bold text-white"/>)
                                    : (item.id)
                                }
                            </div>

                            {/* step name */}
                            <p 
                                className={`absolute -bottom-7 w-max
                                    ${step !== item.id ? 'text-richblack-400' : ''}`}
                            >
                                {item.title}
                            </p>
                        </div>
                        
                        {/* dotted lines */}
                        {
                            item.id !== steps.length && (
                                <div
                                    className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2
                                    ${step > item.id ? 'border-yellow-50' : 'border-richblack-500'}
                                    `}
                                >
                                </div>
                            )
                        }
                    </React.Fragment>
                ))
            }
        </div>
            

        {/* render current step */}
        <div className='mt-14'>
            {step === 1 && <HerbInformation/>}
            {step === 2 && <HerbMedia/>}
            {step === 3 && <PublishHerb/>}
        </div>
    </>
  )
}
