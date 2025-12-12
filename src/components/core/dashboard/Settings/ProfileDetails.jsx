import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setLoading } from '../../../../slices/authSlice';

// components
import { IconBtn } from '../../../common/IconBtn';

// APIs
import { updateProfileDetails } from '../../../../services/operations/profileSettingsAPIs';


const ProfileDetails = () => {
    
    const {token, loading} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    // to check if there any change in form by comparing previous values
    const isFormUpdated = (formData) => {
        if(user.firstName !== formData.firstName
        || user?.lastName !== formData.lastName
        || user?.additionalDetails?.dateOfBirth !== formData.dateOfBirth
        || user?.additionalDetails?.gender !== formData.gender
        || user?.additionalDetails?.contactNumber !== formData.contactNumber
        || user?.additionalDetails?.about !== formData.about
        ) {
        return true;
        } else {
        return false;
        }
    }

    // function to update profile details
    const updateProfileDetailsHandler = async (data) => {

        // call api only when form data is updated
        if(isFormUpdated(data)) {
            dispatch(setLoading(true));      
            // call api
            await updateProfileDetails(token, data, dispatch);
            dispatch(setLoading(false));      
        } else {
            toast.error("No changes made");
        }
    }

    // set default values to the form from user details
    useEffect(() => {
        // set form values
        setValue('firstName', user.firstName);

        if(user?.lastName) {
        setValue('lastName', user?.lastName);
        }
        if(user?.additionalDetails?.dateOfBirth) {
        setValue('dateOfBirth', user?.additionalDetails?.dateOfBirth);
        }
        if(user?.additionalDetails?.gender) {
        setValue('gender', user?.additionalDetails?.gender);
        }
        if(user?.additionalDetails?.contactNumber) {
        setValue('contactNumber', user?.additionalDetails?.contactNumber);
        }
        if(user?.additionalDetails?.about) {
        setValue('about', user?.additionalDetails?.about);
        }
    }, []);
    

  return (
    <>
        {/* heading */}
        <div className='text-lg font-[500] text-center sm:text-start'>
            <p>Update Personal details</p>
        </div>
        
        {/* profile details form */}
        <form 
            id='profileDetailsForm'
            onSubmit={handleSubmit(updateProfileDetailsHandler)}
            className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full space-x-6 p-8 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'  
        > 
            {/* first name */}
            <div>
                <label htmlFor='firstName'>
                    First name
                </label>

                <input
                    type='text'
                    id='firstName'
                    placeholder='First Name'
                    {...register('firstName', {required: true})}
                    className='form-input'
                />
                {errors.firstName && (
                    <span className='text-xs text-red-500 font-semibold'>First Name is required</span>
                )}
            </div>
            
            {/* last name */}
            <div>
                <label htmlFor='lastName'>
                    Last name
                </label>

                <input
                    type='text'
                    id='lastName'
                    placeholder='Last Name'
                    {...register('lastName')}
                    className='form-input'
                />
            </div>

            {/* date of birth */}
            <div>
                <label htmlFor='dateOfBirth'>
                    Date of Birth
                </label>

                <input
                    type='date'
                    id='dateOfBirth'
                    {...register('dateOfBirth')}
                    className='form-input'
                />
            </div>

            {/* gender */}
            <div>
                <label htmlFor='gender'>
                    Gender
                </label>

                <select
                    id='gender'
                    className='w-full p-[0.5rem] rounded-[5px] border-[1px] border-[#585d69] outline-none'
                    {...register('gender')}
                    placeholder="Select your gender"
                > 
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {/* phone number */}
            <div>
                <label htmlFor='contactNumber'>
                    Phone Number
                </label>

                <input
                    type='text'
                    id='contactNumber'
                    placeholder='Phone number'
                    {...register('contactNumber')}
                    className='form-input'
                />
            </div>

            {/* about */}
            <div>
                <label htmlFor='about'>
                    About
                </label>

                <input
                    type='text'
                    id='about'
                    placeholder='About you'
                    {...register('about')}
                    className='form-input'
                />
            </div>
        </form>
        
        {/* buttons */}
        <div className='w-full flex items-center justify-center gap-5'>
            {/* cancel */}
            <button
                onClick={() => navigate('/dashboard/my-profile')}
                disabled={loading}
                className='bg-richblack-400 px-6 py-2 rounded-md cursor-pointer text-white'
            >
                Cancel
            </button>
            
            {/* save */}
            <IconBtn
                form='profileDetailsForm'
                text={"Save"}
                disabled={loading}
            />
        </div>
    </>
  )
}

export default ProfileDetails