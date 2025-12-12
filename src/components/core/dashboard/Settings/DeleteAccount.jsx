import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// components
import { ConfirmationModal } from '../../../common/ConfirmationModal';

// icons
import { RiDeleteBinLine } from "react-icons/ri";

// APIs
import { deleteAccount } from '../../../../services/operations/profileSettingsAPIs';
import { logout } from '../../../../services/operations/authAPIs';


const DeleteAccount = () => {

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModalData, setConfirmationModalData] = useState(null);
    
    // function to delete user account
    const handleAccountDelete = async () => {

        const result = await deleteAccount(token);

        // if account delete successful call logout function
        if(result) {
            logout(dispatch, navigate);
        }

        // close confirmation modal
        setConfirmationModalData(null);
    }

  return (
    <>
        <div className='flex gap-4 rounded-lg p-8 bg-red-100 outline-1 outline-red-400'>
            {/* icon */}
            <div className='hidden sm:flex bg-red-400 h-fit w-fit p-4 rounded-full'>
                <RiDeleteBinLine size={24}/>
            </div>

            <div className='flex flex-col gap-2'>
                {/* heading */}
                <p className='text-lg font-[500]'>
                Delete Account
                </p>
                
                <div>
                    <p>
                        Would you like to delete your account ?
                    </p>

                    <p>
                        Deleting your account is permanent and will remove all the contain associated with it.
                    </p>
                </div>

                {/* delete button */}
                <div>
                    <p
                        className='text-red-500 italic font-semibold cursor-pointer w-fit'
                        onClick={() => setConfirmationModalData({
                            header: "Are you sure ?",
                            message: "Your account will be deleted permanently",
                            acceptText: "Delete",
                            rejectText: "Cancel",
                            accept: handleAccountDelete,
                            reject: () => setConfirmationModalData(null),
                        })}
                    >
                        I want to delete my account
                    </p>
                </div>
            </div>
        </div>

        {
            confirmationModalData && (
                <ConfirmationModal
                    confirmationModalData={confirmationModalData}
                />
            )
        }
    </>
  )
}

export default DeleteAccount