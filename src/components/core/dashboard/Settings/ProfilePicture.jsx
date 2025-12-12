import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { setLoading } from '../../../../slices/authSlice';

// components
import { IconBtn } from '../../../common/IconBtn';

// icons
import { RxCross2 } from "react-icons/rx";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

// APIs
import { deleteProfilePicture, updateProfilePicture } from '../../../../services/operations/profileSettingsAPIs';
import { ConfirmationModal } from '../../../common/ConfirmationModal';


const ProfilePicture = () => {

    const {user} = useSelector((state) => state.profile);
    const {token, loading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [confirmationModalData, setConfirmationModalData] = useState(null);


    // function to handle file change for profile image input
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
      }
  
      // calls upload profile image API
      const uploadImageHandler = async () => {
        // if no image selected
        if(!image) {
          toast.error("Please select an image");
          return;
        }
  
        // create form data
        const formData = new FormData();
        formData.append('image', image);
        
        dispatch(setLoading(true));
        // call API
        const result = await updateProfilePicture(token, formData, dispatch);
        dispatch(setLoading(false));
        
        // reset states
        if(result) {
          setImage(null);
          setImagePreview(null);
        }
      }

      // calls delete profile image API
      const handleDeletePicture = async () => {
        await deleteProfilePicture(token, dispatch);
      }

  return (
    <>
        {/* heading */}
        <div className='text-lg font-[500] text-center sm:text-start'>
            <p>Change Profile picture</p>
          </div>

          <div className='flex flex-col sm:flex-row gap-8 items-center w-full p-8 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>

              {/* image container */}
              <div className='relative rounded-full'>
                <img
                  src={
                    imagePreview ? imagePreview 
                    : user?.additionalDetails?.image ? user.additionalDetails?.image
                    : `https://api.dicebear.com/9.x/initials/svg?seed=${user.firstName}+${user?.lastName}`
                  }
                  className='w-[100px] h-[100px] object-cover rounded-full'
                />
                
                {/* delete profile image button */}
                {
                    user.additionalDetails?.image && image === null ? (
                      <span 
                        className='absolute bottom-2 right-1 p-1 rounded-full bg-red-600 text-white cursor-pointer'
                        onClick={() => {
                          setConfirmationModalData({
                            header: 'Are your sure ?',
                            message: 'Your profile picture will be deleted permanently',
                            acceptText: 'Delete',
                            rejectText: 'Cancel',
                            accept: handleDeletePicture,
                            reject: () => setConfirmationModalData(null),
                          });
                        }}
                      >
                        <MdDelete/>
                      </span>
                    ) : (<></>)
                }

                {/* cancel image button */}
                {
                    imagePreview && (
                      <span 
                        className='absolute top-2 right-0 bg-red-600 opacity-75 text-white rounded-full p-1 cursor-pointer'
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                        >
                        <RxCross2/>
                      </span>
                    )
                }
              </div>
              
              {/* choose image button */}
              <div>
                  <label htmlFor="uploadFile1"
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white text-base px-4 py-2 outline-none rounded cursor-pointer">
                    <span>Choose Image</span>
                    <input type="file" id='uploadFile1'  accept='.png, .jpg, .jpeg' className="hidden" onChange={handleFileChange}/>
                  </label>
              </div>

              {/* upload image button */}
              <div>
                  <IconBtn 
                    onClick={uploadImageHandler}
                    disabled={loading}
                    type={'button'}
                  >
                    <p className='flex items-center gap-2'>
                      <IoCloudUploadOutline className='mt-1' size={20}/>
                      Upload
                    </p>

                  </IconBtn>
              </div>
          </div>

          {/* display confirmation modal */}
          {
            confirmationModalData && <ConfirmationModal confirmationModalData={confirmationModalData}/>
          }
    </>
  )
}

export default ProfilePicture