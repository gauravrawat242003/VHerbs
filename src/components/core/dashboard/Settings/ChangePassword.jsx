import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { setLoading } from '../../../../slices/authSlice';

// icons
import { VscEye, VscEyeClosed } from "react-icons/vsc";

// components
import { IconBtn } from '../../../common/IconBtn';

// APIs
import { changePassword } from '../../../../services/operations/profileSettingsAPIs';


const ChangePassword = () => {
  
  const {token, loading} = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states to store password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // states to handle show/hide password
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // function to change user account password
  const handlePasswordUpdate = async () => {
    // if any of the field is empty
    if(!currentPassword || !newPassword) {
      return;
    }

    // if both passwords are same
    if(currentPassword === newPassword) {
      toast.error("Current password and new password cannot be same");
      return;
    }

    // create form data
    const formData = new FormData();
    formData.append('oldPassword', currentPassword);
    formData.append('newPassword', newPassword);

    dispatch(setLoading(true))

    // call API
    const result = await changePassword(token, formData);

    if(result) {
      // reset states
      setCurrentPassword('');
      setNewPassword('');
    }

    dispatch(setLoading(false));
  }

  return (
    <>
        {/* heading */}
        <div className='text-lg font-[500] text-center sm:text-start'>
            <p>Change Password</p>
        </div>
        
        {/* password inputs */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 p-8 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
            {/* current password */}
            <div>
                <label className='relative'>
                  <p>Current Password</p>

                  {/* input box */}
                  <input
                    type={`${showCurrentPassword ? 'text' : 'password'}`}
                    className='w-full form-input' 
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                    placeholder="Enter current password"
                  />

                  {/* eye icon */}
                  <span className='absolute top-[70%] right-2 text-richblack-400 cursor-pointer' 
                    onClick={() => setShowCurrentPassword(prev => !prev)}
                  >
                  {
                    showCurrentPassword ? (
                      <VscEyeClosed/>
                    ) :(
                      <VscEye />
                    )
                  }
                  </span>
                </label>
            </div>
            
            {/* new password */}
            <div>
                <label className='relative'>
                    <p>New Password</p>

                    {/* input box */}
                    <input
                      type={`${showNewPassword ? 'text' : 'password'}`}
                      className='w-full form-input'
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      placeholder="Enter new password"
                    />

                    {/* eye icon */}
                    <span className='absolute top-[70%] right-2 text-richblack-400 cursor-pointer' 
                      onClick={() => setShowNewPassword(prev => !prev)}
                    >
                    {
                      showNewPassword ? (
                        <VscEyeClosed/>
                      ) :(
                        <VscEye />
                      )
                    }
                    </span>
                </label>
            </div>
        </div>
        
        {/* buttons */}
        <div className='w-full flex items-center justify-center gap-5'>
            {/* cancel */}
            <button
                onClick={() => navigate('/dashboard/my-profile')}
                disabled={loading}
                className='bg-richblack-400 px-6 py-2 rounded-md cursor-pointer text-white'
                type='button'
            >
                Cancel
            </button>

            {/* submit */}
            <IconBtn
                text={"Save"}
                disabled={loading}
                onClick={handlePasswordUpdate}
            />
        </div>
    </>
  )
}

export default ChangePassword