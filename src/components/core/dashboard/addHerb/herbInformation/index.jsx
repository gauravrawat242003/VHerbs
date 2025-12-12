import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import {setHerb, setStep} from '../../../../../slices/herbSlice';

// prime react components
import TextAreaAutosize from 'react-textarea-autosize';
import { Checkbox } from "primereact/checkbox";

// components
import ChipInput from './ChipInput';
import ObjectArrayInput from './ObjectArrayInput';
import MultiInputs from './MultiInputs';
import { IconBtn } from '../../../../common/IconBtn';

// data
import { categories, regions } from '../../../../../data/heatMapInputData';

// APIs
import { createHerb, updateHerb } from '../../../../../services/operations/herbsAPIs';
import DropdownChipInput from './DropdownChipInput';


const HerbInformation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm();

  const dispatch = useDispatch();

  const {token} = useSelector((state) => state.auth);
  const {herb, editHerb} = useSelector((state) => state.herb);

  const [loading, setLoading] = useState(false);

  // for herb category
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const onCategoryChange = (e) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked)
        _selectedCategories.push(e.value);
    else
        _selectedCategories = _selectedCategories.filter(category => category.key !== e.value.key);

    setSelectedCategories(_selectedCategories);
  };

  // first render
  useEffect(() => {
    if(editHerb) {
      // set selected categories to category state
      setSelectedCategories(JSON.parse(herb.category));

      // set all values of herb in the form
      setValue('commonName', herb.commonName);
      setValue('botanicalName', herb.botanicalName);
      setValue('category', JSON.parse(herb.category));
      setValue('shortDescription', herb.shortDescription);
      setValue('fullDescription', herb.fullDescription);
      setValue('regions', JSON.parse(herb.regions));
      setValue('partsUsed', JSON.parse(herb.partsUsed));
      setValue('uses', JSON.parse(herb.uses));
      setValue('cultivation', JSON.parse(herb.cultivation));
    }

    // register herb category
    register('category', {required: true});
  }, []);

  // if any changes in herb category (select/deselect)
  useEffect(() => {
    setValue('category', selectedCategories);
  }, [selectedCategories]);

  // is there any changes in the form (when we submit)
  const isFormUpdated = () => {
    // get current form values
    const currentValues = getValues();

    // if any of the current value is not equal to the herb data
    // it means that form has been updated
    if(
      currentValues.botanicalName !== herb.botanicalName ||
      currentValues.commonName !== herb.commonName ||
      JSON.stringify(currentValues.category) !== herb.category ||
      currentValues.shortDescription !== herb.shortDescription ||
      currentValues.fullDescription !== herb.fullDescription ||
      JSON.stringify(currentValues.regions) !== herb.regions ||
      JSON.stringify(currentValues.partsUsed) !== herb.partsUsed ||
      JSON.stringify(currentValues.uses) !== herb.uses ||
      JSON.stringify(currentValues.cultivation) !== herb.cultivation
    ) {
      return true;
    } else {
      return false;
    }
  }

  // function to create/update herb
  const formSubmitHandler = async (data) => {
      // console.log("Logging form data: :)", data);

      setLoading(true);
      
      // if in edit mode then update herb api will be called for updated fields
      if(editHerb) {
          if(isFormUpdated()) {
              const formData = new FormData();

              // add herb id to form data
              formData.append('herbId', herb._id);

              // add all updated data to form data
              if(data.botanicalName !== herb.botanicalName) {
                formData.append('botanicalName', data.botanicalName);
              }
              if(data.commonName !== herb.commonName) {
                  formData.append('commonName', data.commonName);
              }
              if(JSON.stringify(data.category) !== herb.category) {
                formData.append('category', JSON.stringify(data.category));
              }
              if(data.shortDescription !== herb.shortDescription) {
                  formData.append('shortDescription', data.shortDescription);
              }
              if(data.fullDescription !== herb.fullDescription) {
                  formData.append('fullDescription', data.fullDescription);
              }
              if(JSON.stringify(data.regions) !== herb.partsUsed) {
                formData.append('regions', JSON.stringify(data.regions));
              }
              if(JSON.stringify(data.partsUsed) !== herb.partsUsed) {
                  formData.append('partsUsed', JSON.stringify(data.partsUsed));
              }
              if(JSON.stringify(data.uses) != herb.uses) {
                  formData.append('uses', JSON.stringify(data.uses));
              }
              if(JSON.stringify(data.cultivation) != herb.cultivation) {
                  formData.append('cultivation', JSON.stringify(data.cultivation));
              }

              // make update herb api call
              const result = await updateHerb(token, formData);

              // go to next step
              if(result) {
                dispatch(setHerb(result));
                dispatch(setStep(2));
                window.scroll({top: 0});
              }
          } else {
              toast.error("No changes made to the form");
          }
      } else {
          // create form data 
          const formData = new FormData();
          formData.append('botanicalName', data.botanicalName);
          formData.append('commonName', data.commonName);
          formData.append('category', JSON.stringify(data.category));
          formData.append('shortDescription', data.shortDescription);
          formData.append('fullDescription', data.fullDescription);
          formData.append('regions', JSON.stringify(data.regions));
          formData.append('partsUsed', JSON.stringify(data.partsUsed));
          formData.append('uses', JSON.stringify(data.uses));
          formData.append('cultivation', JSON.stringify(data.cultivation));

          // call create herb API
          const result = await createHerb(token,formData);

          // go to next step
          if(result) {
            dispatch(setHerb(result));
            dispatch(setStep(2));
            window.scroll({top: 0});
          }
      }

      setLoading(false);
  }
  
  return (
    <div className='bg-white p-8 rounded-md border-1 border-richblack-50'>
      <form 
        onSubmit={handleSubmit(formSubmitHandler)} 
        className='px-2 flex flex-col gap-5'
      >

          {/* heading */}
          <div>
            <p className='text-2xl font-semibold'>Herb Information</p>
          </div>

          {/* botanical name */}
          <div className='flex flex-col gap-1'>
              <label className='text-sm' htmlFor='botanicalName'>
                Botanical Name<sup className='text-red-500'>*</sup>
              </label>

                <input
                  className='form-input'
                  autoComplete="off"
                  type='text'
                  placeholder='Enter botanical name'
                  id='botanicalName'
                  {...register('botanicalName', {required:true})}
                />
                {errors.botanicalName && (<span className='text-red-400 text-sm'>Botanical Name is required</span>)}
          </div>

          {/* common name */}
          <div className='flex flex-col gap-1'>
              <label className='text-sm' htmlFor='commonName'>
                Common Name<sup className='text-red-500'>*</sup>
              </label>

              <input
                className='form-input'
                autoComplete="off"
                type='text'
                id='commonName'
                placeholder='Enter common name'
                {...register('commonName', {required:true})}
              />
              {errors.commonName && (<span className='text-red-400 text-sm'>Common Name is required</span>)}
          </div>

          {/* category */}
          <div>
            <p>Select category</p>

            {/* checkboxes */}
            <div className="mt-2 flex flex-col gap-3">
                {
                  categories.map((category) => (
                    <div key={category.key} className="flex items-center">
                        <Checkbox 
                          inputId={category.key} 
                          name="category" 
                          value={category} 
                          onChange={onCategoryChange} 
                          checked={selectedCategories.some((item) => item.key === category.key)} 
                        />
                        <label htmlFor={category.key} className="ml-2 cursor-pointer">
                            {category.label}
                        </label>
                    </div>
                  ))}
                {
                  errors.category && (<span className='text-red-400 text-sm'>Category is required</span>)
                }
            </div>

          </div>

          {/* short description */}
          <div className='flex flex-col gap-1'>
              <label className='text-sm' htmlFor='shortDescription'>
                Short Description<sup className='text-red-500'>*</sup>
              </label>

              <TextAreaAutosize
                  id='shortDescription'
                  maxRows={4}
                  className='form-textarea'
                  placeholder='Enter short description'
                  {...register('shortDescription', {required:true})}
               />
              {errors.shortDescription && (<span className='text-red-400 text-sm'>Short Description is required</span>)}
          </div>

          {/* full description */}
          <div className='flex flex-col gap-1'>
              <label className='text-sm' htmlFor='fullDescription'>
                Full Description<sup className='text-red-500'>*</sup>
              </label>

              <TextAreaAutosize
                  id='fullDescription'
                  maxRows={6}
                  className='form-textarea'
                  placeholder='Enter full description'
                  {...register('fullDescription', {required:true})}
               />
              {errors.fullDescription && (<span className='text-red-400 text-sm'>Full Description is required</span>)}
          </div>

          {/* regions (states) */}
          <div>   
            <DropdownChipInput
              dropdownOptions={regions}
              name="regions"
              label="Regions"
              dropdownPlaceholder="Select a Region"
              isNumberInput={true}
              numberInputPlaceholder="Enter density (1-9)"
              errors={errors}
              register={register}
              setValue={setValue}
            />
          </div>

          {/* parts used */}
          <div>   
            {/* array of strings */}
            <ChipInput
              name="partsUsed"
              label="Parts Used"
              placeholder="Enter part name"
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
          </div>

          {/* uses */}
          <div>
            {/* array of object */}
            <ObjectArrayInput
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
              name="uses"
              inputName1="use"
              inputName2="description"
              placeholder1="Enter herb use"
              placeholder2="Enter description of use"
              label="Use"
            />
          </div>

          {/* cultivation */}
          <div>
            <MultiInputs
              name="cultivation"
              label="Cultivation method"
              placeholder="Enter cultivation step"
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
          </div>

          {/* buttons */}
          <div className='flex flex-col xs:flex-row mx-auto xs:mx-0 gap-3 xs:gap-2 mt-6 items-stretch w-fit xs:w-auto justify-end'>
              {/* if edit mode */}
              <div>
                {
                    editHerb && (
                      <button 
                          type='button' 
                          disabled={loading}
                          onClick={() => {
                            dispatch(setStep(2));
                            window.scroll({top: 0});
                          }}
                          className='button-2 flex'
                        >
                          Continue without Saving
                      </button>
                    )
                }
              </div>

              {/* next button */}
              <IconBtn
                  text={editHerb ? 'Save Changes' : 'Next'}
                  type='button'
                  disabled={loading}
                  onClick={handleSubmit(formSubmitHandler)}
                  iconName='MdKeyboardArrowRight'
              />
          </div>
      </form>
    </div>
  )
}

export default HerbInformation