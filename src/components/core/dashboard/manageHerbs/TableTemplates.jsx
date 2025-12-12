// constants
import { HERB_STATUS } from "../../../../utils/constants"

// icons
import { BsFillClockFill } from "react-icons/bs"
import { IoIosCheckmarkCircle } from "react-icons/io"


// template for botanical name and common name
export const nameTemplate = (rowData, name) => {
    return (
        <div className='text-black'>
            {rowData[name]}
        </div>
    )
}

// template to render image in table
export const ImageBodyTemplate = (rowData) => {
    return (
        <div className='py-4'>
            <img 
                src={rowData.image} 
                className='min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] object-cover rounded-md'
                loading='lazy'    
            />
        </div>
    )
}

// template to render herb status (draft or published)
export const StatusTemplate = (rowData) => {
    return (
        <div className='flex justify-center'>
            {
                rowData.status === HERB_STATUS.DRAFT ? (
                    <p className='text-red-500'>
                        <BsFillClockFill/>
                    </p>
                ) : (
                    <p className='text-green-500'>
                        <IoIosCheckmarkCircle/>
                    </p>
                )
            }
        </div>
    )
}
