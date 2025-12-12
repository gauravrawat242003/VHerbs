import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

// icons
import { IoCloseCircleOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";

const ChipInput = ({ name, label, placeholder, errors, register, setValue}) => {

    const {herb, editHerb} = useSelector((state) => state.herb);

    const [chips, setChips] = useState([]);

    const chipValue = useRef(null);

    useEffect(() => {
        // when in edit mode all previous chips will be displayed
        if(editHerb) {       
            setChips(JSON.parse(herb[name]));
        }

        // register in form state
        register(name, {required: true});
    }, []);

    useEffect(() => {
        setValue(name, chips);
    }, [chips]);

    // function to add chip
    const handleAddChip = (e) => {
        e.preventDefault();
        
        // if input is empty
        const input = chipValue.current.value.trim();
        if(input.length === 0) {
            return;
        }

        // if valuie already added
        if(chips.includes(input)) {
            toast.error('already added');
            return;
        }

        // add value
        const newChips = [...chips, input];
        setChips(newChips);

        // reset input value
        chipValue.current.value = "";
    }

    // function to delete chip
    const handleDeleteChip = (chipIndex) => {
        const updatedParts = chips.filter((_, idx) => idx !== chipIndex);
        setChips(updatedParts);
    }

  return (
    <div className='flex flex-col gap-1'>

        <label className='text-sm'>
            {label}<sup className='text-red-500'>*</sup>
        </label>

        {/* display chips */}
        <div className='flex gap-2 flex-wrap'>
            {
                chips.map((chip, index) => (
                    <div key={index} className='flex gap-2 items-center bg-[#DBF5F2] px-2 py-1 rounded-full'>
                        <p className='text-sm'>
                            {chip}
                        </p>
                        <span 
                            className='cursor-pointer text-red-500 hover:scale-110 transition-all duration-200'
                            onClick={() => handleDeleteChip(index)}
                        >
                            <IoCloseCircleOutline />
                        </span>
                    </div>
                ))
            }
        </div>

        {/* input and add button for adding new chips*/}
        <div className='flex space-x-8 items-center'>
            {/* input box */}
            <div className='w-full'>
                <input
                    type='text'
                    autoComplete="off"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    ref={chipValue}
                    className='form-input'                    
                />
                {chips.length === 0 && errors[name] && (
                    <span className='text-red-400 text-sm'>{label} is required</span>
                )}
            </div>
            
            {/* add chip button */}
            <div
                onClick={handleAddChip}
                className='button-1 flex gap-1'
            >
                <FiPlus/>
                <p>Add</p>
            </div>
        </div>
    </div>
  )
}

export default ChipInput