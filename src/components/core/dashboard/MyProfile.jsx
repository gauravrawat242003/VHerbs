import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

// icons
import { MdOutlineModeEdit } from "react-icons/md";

// components
import { IconBtn } from '../../common/IconBtn';

const MyProfile = () => {

  const {user} = useSelector((state) => state.profile);

  const navigate = useNavigate();


  return (
    <div className='py-20 flex flex-col items-start gap-10'>
        
        {/* heading */}
        <section className='text-3xl font-bold'>
          <h2>My Profile</h2>
        </section>

        {/* profile picture section */}
        <section className='flex flex-col sm:flex-row gap-2 sm:gap-8 items-center w-full p-8 rounded-lg'>
            {/* photo */}
            <div className='relative rounded-full'>
                <img 
                  src={
                    user?.additionalDetails?.image 
                    ? user?.additionalDetails?.image 
                    : `https://api.dicebear.com/9.x/initials/svg?seed=${user.firstName}+${user?.lastName}`
                  }
                  className='w-[70px] h-[70px] object-cover rounded-full'
                />

                {/* edit logo */}
                <span 
                  className='absolute -right-2 top-1/2 h-6 w-6 bg-orange-600 rounded-full flex items-center justify-center cursor-pointer'
                  onClick={() => navigate("/dashboard/settings")}  
                >
                  <MdOutlineModeEdit className='text-white'/>
                </span>
            </div>

            {/* name and email */}
            <div className='text-center sm:text-start'>
                <p className='text-lg font-[600]'>
                  {`${user.firstName} ${user?.lastName}`}
                </p>

                <p className='text-richblack-300 text-sm'>
                    {user.email}
                </p>
            </div>
        </section>

        {/* about section */}
        <section className='w-full p-8 flex flex-col gap-4 rounded-lg border-1'>
            {/* heading */}
            <div className='flex justify-between items-center'>
                <p className='text-lg font-semibold'>About</p>
                <IconBtn 
                  text={"Edit"}
                  onClick={() => navigate("/dashboard/settings")}
                  type={'button'}
                  iconName={'MdOutlineEdit'}
                />
            </div>
            
            {/* about */}
            <div>
                <p className='text-richblack-300'>
                    {user?.additionalDetails?.about.length > 0 ? user.additionalDetails.about : "-"}
                </p>
            </div>

        </section>

        {/* additional details */}
        <section className='w-full p-8 flex flex-col gap-4 rounded-lg border-1'>
            {/* heading */}
            <div className='flex justify-between items-center'>
                <p className='text-lg font-semibold'>Personal Details</p>
                <IconBtn 
                  text={"Edit"}
                  onClick={() => navigate("/dashboard/settings")}
                  type={'button'}
                  iconName={'MdOutlineEdit'}
                />
            </div>
            
            {/* details */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {/* first name */}
                <div>
                    <p className='text-sm text-richblack-300 font-[400]'>First Name</p>
                    <p>
                      {user.firstName}
                    </p>
                </div>

                {/* last name */}
                <div>
                    <p className='text-sm text-richblack-300 font-[400]'>Last Name</p>
                    <p>
                      {`${user?.lastName ? user?.lastName : "-"}`}
                    </p>
                </div>
                  

                {/* email */}
                <div>
                    <p className='text-sm text-richblack-300 font-[400]'>Email</p>
                    <p>
                      {user.email}
                    </p>
                </div>

                {/* gender */}
                <div>
                    <p className='text-sm text-richblack-300 font-[400]'>Gender</p>
                    <p>
                      {`${user?.additionalDetails?.gender ? user?.additionalDetails?.gender : "-"}`}
                    </p>
                </div>

                {/* phone number */}
                <div>
                    <p className='text-sm text-richblack-300 font-[400]'>Phone Number</p>
                    <p>
                      {`${user?.additionalDetails?.contactNumber ? user?.additionalDetails?.contactNumber : "-"}`}
                    </p>
                </div>

                {/* date of birth */}
                <div>
                    <p className='text-sm text-richblack-300 font-[400]'>Date of Birth</p>
                    <p>
                      {`${user?.additionalDetails?.dateOfBirth ? user?.additionalDetails?.dateOfBirth : "-"}`}
                    </p>
                </div>

            </div>
        </section>
    </div>
  )
}

export default MyProfile