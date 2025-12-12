import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TextAreaAutosize from 'react-textarea-autosize';

// icons
import { FiPlus } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';


const MultiInputs = ({name, label, placeholder, errors, register, setValue, getValues}) => {

    const {herb, editHerb} = useSelector((state) => state.herb);

    const [inputs, setInputs] = useState([{text:""}]);

    useEffect(() => {
        if(editHerb) {
            setInputs(JSON.parse(herb[name]));
        }

        register(name, {required: true});
    }, []);

    useEffect(() => {
        setValue(name, inputs);
    }, [inputs]);

    // function to handle input text change
    const handleChange = (value, index) => {
        let updatedInputs = [...inputs];
        updatedInputs[index].text = value;
        setInputs(updatedInputs);
    }

    // function to add input field
    const handleAddInputField = () => {
        let updatedInputs = [...inputs];
        updatedInputs.push({text:""});
        setInputs(updatedInputs);
    }

    // function to delete input field
    const handleRemoveInputField = (index) => {
        let updatedInputs = [...inputs];
        updatedInputs.splice(index, 1);
        setInputs(updatedInputs);
    }

  return (
    <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>

            <label className='text-sm'>
                {label}<sup className='text-red-500'>*</sup>
            </label>
            
            {/* display inputs */}
            <div className='flex flex-col gap-2'>
                {
                    inputs.map((item, index) => (
                        <div
                            key={index}
                            className='flex gap-2 items-center' 
                        >
                            <TextAreaAutosize
                                placeholder={placeholder}
                                maxRows={5}
                                value={item.text}
                                onChange={(e) => handleChange(e.target.value, index)}
                                className='form-textarea'
                            />

                            {/* delete button */}
                            <div
                                className='cursor-pointer text-red-400 hover:animate-wiggle'
                                onClick={() => handleRemoveInputField(index)}
                            >
                                <MdDelete size={20}/>
                            </div>

                        </div>
                    ))
                }
            </div>
            
            {/* add input field button */}
            <div 
                onClick={handleAddInputField}
                className='button-1 flex gap-2 self-start'
            >
                <FiPlus/>
                <p>Add input field</p>
            </div>
        </div>

        {
            errors[name] && (<span className='text-red-400 text-sm'>{label} is required</span>)
        }
    </div>
    
  )
}

export default MultiInputs