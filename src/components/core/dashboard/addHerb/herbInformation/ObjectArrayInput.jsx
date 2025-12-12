import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TextAreaAutosize from 'react-textarea-autosize';

// icons
import { MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi";


const ObjectArrayInput = ({
  errors, 
  register, 
  setValue, 
  name, 
  inputName1, 
  inputName2, 
  placeholder1, 
  placeholder2, 
  label,
}) => {

    const {herb, editHerb} = useSelector((state) => state.herb);

    const [formValues, setFormValues] = useState([{[inputName1]:"", [inputName2]: ""}])
  
    useEffect(() => {
      // when in edit mode all previous input fields will be displayed
      if(editHerb) {
        setFormValues(JSON.parse(herb[name]));
      }
      
      // register form state
      register(name, {required: true});
    }, []);

    useEffect(() => {
      setValue(name, formValues);
    }, [formValues]);

    // function to handle text change in input box
    const handleChange = (e, index) => {
        let newFormValues = [...formValues];
        newFormValues[index][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    // function to add input field
    const handleAddInputField = () => {
      setFormValues((prevState) => [...prevState, {[inputName1]: "", [inputName2]: ""}]);
    }

    // function to delete input field
    const handleRemoveInputField = (index) => {
      let newFormValues = [...formValues];
      newFormValues.splice(index, 1);
      setFormValues(newFormValues);
    }

  return (
    <div className='flex flex-col gap-2'>

      <label className='text-sm'>
          {label}<sup className='text-red-500'>*</sup>
      </label>

        {/* input fields */}
        <div className='flex flex-col gap-2'>
          {
            // display all inputs with delete buttons
            formValues.map((element, index) => (
              <div key={index} className='flex flex-col sm:flex-row gap-4 items-start'>
                  {/* input box */}
                  <input
                    type='text'
                    autoComplete="off"
                    name={inputName1}
                    value={element[inputName1] || ""}
                    placeholder={placeholder1}
                    onChange={(e) => handleChange(e, index)}
                    className='form-input'
                  />
                  
                  {/* auto growing text area */}
                  <TextAreaAutosize
                    name={inputName2}
                    value={element[inputName2] || ""}
                    onChange={(e) => handleChange(e, index)}
                    placeholder={placeholder2}
                    className='form-textarea'
                    maxRows={4}
                />

                  {/* delete button */}
                  <div
                    className='sm:mt-2.5 cursor-pointer text-red-400 group'
                    onClick={() => handleRemoveInputField(index)}
                  >
                    <MdDelete size={20} className='hidden sm:flex group-hover:hover:animate-wiggle'/>
                    <p className='flex sm:hidden'>Delete Input Field</p>
                  </div>

              </div>
            ))
          }
        </div>

        {/* add input fields button */}
        <div>
            <button
              type='button'
              className='button-1 flex gap-2'
              onClick={handleAddInputField}
              >
                <FiPlus />
                <p>Add Input Field</p>
            </button>
        </div>
        {
            errors[name] && (<span className='text-red-400 text-sm'>{label} is required</span>)
        }
    </div>
  )
}

export default ObjectArrayInput