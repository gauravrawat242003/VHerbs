import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import {setEditHerb, setStep} from '../../../../../slices/herbSlice';

// components
import Upload from './Upload';
import ModelUploader from './ModelUploader';
import { IconBtn } from '../../../../common/IconBtn';

// APIs
import { updateHerb, uploadHerbMedia } from '../../../../../services/operations/herbsAPIs';


const HerbMedia = () => {

  const {herb, editHerb} = useSelector((state) => state.herb);
  const {token} = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors}
  } = useForm();

  useEffect(() => {

  }, []);

  // function to upload herb media
  const submitHandler = async () => {   
    
      setLoading(true);

      let result = null;
      const data = getValues();
      const formData = new FormData();
      if(getValues('image'))  formData.append('image', getValues('image'));
      if(getValues('video'))  formData.append('video', getValues('video'));
      if(getValues('model'))  formData.append('model', getValues('model'));

      // check if form data is updated or not
      let formUpdated = false;
      for (const value of formData.values()) {
        if(value) {
          formUpdated = true;
          break;
        }
      }

      // if in edit mode check if any of the field has media uploaded
      if(editHerb) {
        // if form data is updated
        if(formUpdated) {
            formData.append('herbId', herb._id);
            // console.log(formData);
            
            // call update herb API
            result = await updateHerb(token, formData);
        } else {
          toast.error("No changes made");
        }
      } 
      // call upload herb media API 
      else { 
        // add herbId to data
        data.herbId = herb._id;
        result = await uploadHerbMedia(data, token);
      }

      // go to next step
      if(result) {
        dispatch(setStep(3));
        window.scroll({top: 0});
      }

      setLoading(false);
  }

  return (
    <div className='bg-white p-8 rounded-md border-1 border-richblack-50'>
        <form  
          onSubmit={handleSubmit(submitHandler)}
          className="px-2 flex flex-col gap-5"
        >
            {/* image uploader */}
            <div className=''>
              <Upload
                name="image"
                label="Herb Image"
                isRequired={true}
                setValue={setValue}
                register={register}
                errors={errors}
                editData={editHerb ? herb?.image : null}
              />
            </div>

            {/* video uploader */}
            <div>
              <Upload
                name="video"
                label="Herb Video"
                setValue={setValue}
                register={register}
                errors={errors}
                video={true}
                editData={editHerb ? herb?.video : null}
              />
            </div>

            {/* model uploader */}
            <div>
                <ModelUploader
                  name="model"
                  label="Herb Model"
                  setValue={setValue}
                  register={register}
                  errors={errors}
                  editData={editHerb ? herb?.model : null}
                />
            </div>


            {/* buttons */}
            <div className='flex flex-wrap flex-col sm:flex-row mx-auto sm:mx-0 gap-3 sm:gap-2 mt-6 items-stretch w-fit sm:w-auto justify-end'>
                {/* Go back button */}
                <div className=''>
                    <button
                      className='button-2 w-full'
                      disabled={loading}
                      type='button'
                      onClick={() => {
                        dispatch(setEditHerb(true))
                        dispatch(setStep(1))
                        window.scroll({top: 0});
                      }}
                    >
                        Go Back
                    </button>
                </div>

                
                {/* continue without saving button */}
                <div className=''>
                    {
                      editHerb && (
                          <button
                            className='button-2'
                            disabled={loading}
                            type='button'
                            onClick={() => {
                              dispatch(setStep(3));
                              window.scroll({top: 0});
                            }}
                          >
                              Continue without saving
                          </button>
                        )
                    }
                </div>

                {/* submit button */}
                <IconBtn
                    text={editHerb ? 'Save Changes' : 'Next'}
                    type='submit'
                    disabled={loading}
                    iconName='MdKeyboardArrowRight'
                    onClick={submitHandler}
                />
            </div>
        </form>
    </div>
  )
}

export default HerbMedia