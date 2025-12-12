import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { setEditHerb, setHerb, setStep } from '../../../../../slices/herbSlice';

// constants
import { HERB_STATUS } from '../../../../../utils/constants';

// components
import { IconBtn } from '../../../../common/IconBtn';

// APIs
import { updateHerb } from '../../../../../services/operations/herbsAPIs';


const PublishHerb = () => {

  const {herb, editHerb} = useSelector((state) => state.herb);
  const {token} = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(herb.status === HERB_STATUS.PUBLISHED);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function to publish & draft herb
  const handleSubmit = async (e) => {
      e.preventDefault();

      const herbStatus = isChecked ? HERB_STATUS.PUBLISHED : HERB_STATUS.DRAFT;

      // create data of herbId and herb status
      const formData = new FormData();
      formData.append('herbId', herb._id);
      formData.append('status', herbStatus);

      setLoading(true);

      // call update herb API
      const result = await updateHerb(token, formData);

      // if update successful
      if(result) {
        // reset edit data from slice
        dispatch(setEditHerb(false));
        dispatch(setStep(1));
        dispatch(setHerb(null));

        // go to manage herbs route
        navigate('/dashboard/manage-herbs');
        window.scroll({top: 0});
      }

      setLoading(false);
  }

  return (
    <form className='flex flex-col gap-4 bg-white p-8 rounded-md border-1 border-richblack-50'>

      {/* heading */}
      <div>
        <p className='text-2xl font-semibold'>Publish Setting</p>
      </div>

      {/* checkbox */}
      <div className="checkbox-wrapper-1 flex flex-col xs:flex-row items-center gap-2">
        <label className="rocker rocker-small">
          <input 
            type="checkbox"
            id="status"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <span className="switch-left">Yes</span>
          <span className="switch-right">No</span>
        </label>
        
        <label htmlFor='status'>
              Make herb available to public
        </label>
      </div>

      {/* buttons */}
      <div className='flex flex-col xs:flex-row mx-auto xs:mx-0 gap-3 xs:gap-2 mt-6 items-stretch w-fit xs:w-auto justify-end'>

          {/* Go back button */}
          <div className=''>
              <button
                className='button-2 w-full'
                disabled={loading}
                type='button'
                onClick={() => {
                  dispatch(setEditHerb(true))
                  dispatch(setStep(2))
                }}
              >
                  Go Back
              </button>
          </div>


          {/* next button */}
          <IconBtn
              text={editHerb ? 'Save Changes' : 'Next'}
              disabled={loading}
              type='button'
              onClick={handleSubmit}
              iconName='MdKeyboardArrowRight'
          />
      </div>
    </form>
  )
}

export default PublishHerb