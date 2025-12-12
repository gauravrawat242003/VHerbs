import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

// prime react components
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

// icons
import { IoCloseCircleOutline } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';

const DropdownChipInput = ({
    dropdownOptions, 
    name, 
    label, 
    dropdownPlaceholder, 
    isNumberInput=false, 
    numberInputPlaceholder, 
    errors, 
    register, 
    setValue
}) => {

    const {herb, editHerb} = useSelector((state) => state.herb);

    const [chips, setChips] = useState([]);

    const [selectedOption, setSelectedRegion] = useState(null);
    const [number, setNumber] = useState(null);


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
        if(!selectedOption) {
            return;
        }

        const inputData = `${selectedOption.name} ${number ? number : 1}`

        // if chip already added
        let alreadyAdded = false;
        chips.forEach((chip) => {
            const arr = chip.split(' ');
            const chipValue = arr.slice(0, arr.length-1).join(' ');
            if(chipValue === selectedOption.name) {
                alreadyAdded = true;
            }
        })

        if(alreadyAdded) {
            toast.error("Already added");
            return;
        }

        // add chip
        const newChips = [...chips, inputData];
        setChips(newChips);

        // reset input value
        setSelectedRegion(null);
        setNumber(null);
    }

    // function to delete chip
    const handleDeleteChip = (chipIndex) => {
        const updatedChips = chips.filter((_, idx) => idx !== chipIndex);
        setChips(updatedChips);
    }

    // template for drop down options
    const dropDownOptionTemplate = (option) => {
        return (
            <div>{option.name}</div>
        );
    };

    // template for selected region on dropdown
    const selectedOptionTemplate = (option, props) => {
        if (option) {
            return <div>{option.name}</div>
        }

        return <span>{props.placeholder}</span>;
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
        
        {/* input container */}
        <div>
            {/* input boxes */}
            <div className='flex flex-col sm:flex-row gap-2'>
            {/* dropdown */}
                <Dropdown 
                    filter={true}
                    filterPlaceholder='Search'
                    value={selectedOption} 
                    onChange={(e) => setSelectedRegion(e.value)} 
                    options={dropdownOptions} 
                    optionLabel='name'
                    placeholder={dropdownPlaceholder} 
                    valueTemplate={selectedOptionTemplate}
                    itemTemplate={dropDownOptionTemplate}
                    highlightOnSelect={true}
                    style={{width: '100%'}}
                />
            
                {/* number input */}
                { isNumberInput && (
                    <InputNumber 
                        value={number} 
                        placeholder={numberInputPlaceholder}
                        onChange={(e) => setNumber(e.value)} 
                        min={1}
                        max={9}
                    />
                )}
            </div>
            
            {/* error handle */}
            {chips.length === 0 && errors[name] && (
                <span className='text-red-400 text-sm'>{label} is required</span>
            )}
            
            {/* add chip button */}
            <div className='mt-2'>
                <button
                    type='button'
                    onClick={handleAddChip}
                    className='button-1 flex gap-1'
                >
                    <FiPlus/>
                    <p>Add</p>
                </button>
            </div>
        </div>

    </div>
  )
}

export default DropdownChipInput