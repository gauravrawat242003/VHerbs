import React, { useEffect, useState } from 'react'

// icons
import { LiaSlidersHSolid } from "react-icons/lia";
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

// data
import { 
  categoryOptions, 
  regionOptions, 
  medicinalUsesOptions, 
  partsUsedOptions, 
  regionsOfIndia 
} from '../../../data/filterHerbData';


// paceholders for search input
const inputPlaceholders = [
  "botanical name",
  "state name",
  "common name",
  "use",
]

// component for Filter option pop up window
const FilterOptionsContainer = ({
  setShowFilterOptions, 
  category, setCategory, 
  region, setRegion, 
  medicinalUses, setMedicinalUses, 
  partsUsed, setPartsUsed,
  handleApplyFilter,
  clearAllFilter,
}) => {

  // change state data if any option is checked in filter
  const handleOptionChange = (e, setState) => {
    setState((prev) => {
     return {
      ...prev,
      [e.target.name]:e.target.checked
     }
    });
  } 

  return (
    <div className='bg-[#E6E6E6] rounded-xl py-6 px-8'>
      
      {/* close filter icon */}
      <div 
        onClick={() => setShowFilterOptions(prev => !prev)}
        className='-mt-2 -ml-4 p-1 bg-[#bcbbbb] rounded-full w-fit cursor-pointer hover:bg-[#aeadad] transition-all duration-300'
      >
        <IoMdClose size={18}/>
      </div>

      {/* category */}
      <div className='mt-4 flex flex-col gap-4'>
          {/* heading */}
          <div className='pb-2 border-b-1 border-b-[#bcbbbb]'>
            <p className='font-semibold'>Category</p>
          </div>

          {/* checkbox options */}
          <div className='flex flex-wrap gap-4'>
          {
              categoryOptions.map((item) => (
                <label 
                  key={item.id}
                  htmlFor={item.name} 
                  className={`flex align-items-center p-2 border-2 rounded-full w-fit cursor-pointer
                    ${category[item.name] ? 'border-green-500' : 'border-[#bcbbbb]'}
                  `}
                >

                    <input 
                      type='checkbox'
                      id={item.name} 
                      value={category[item.name]}
                      name={item.name}
                      onChange={(e) => handleOptionChange(e, setCategory)}
                      className='appearance-none '
                    />

                    <p className="ml-2 cursor-pointer">{item.label}</p>
                </label>
              ))
          }
            
          </div>
      </div>

      {/* region */}
      <div className='mt-4 flex flex-col gap-4'>
          {/* heading */}
          <div className='pb-2 border-b-1 border-b-[#bcbbbb]'>
            <p className='font-semibold'>Region</p>
          </div>

          {/* checkbox options */}
          <div className='flex flex-wrap gap-4'>
          {
              regionOptions.map((item) => (
                <label 
                  key={item.id}
                  htmlFor={item.name} 
                  className={`flex align-items-center p-2 border-2 rounded-full w-fit cursor-pointer
                    ${region[item.name] ? 'border-green-500' : 'border-[#bcbbbb]'}
                  `}
                >
                    <input 
                      type='checkbox'
                      id={item.name} 
                      value={category[item.name]}
                      name={item.name}
                      onChange={(e) => handleOptionChange(e, setRegion)}
                      className='appearance-none '
                    />
                    <p className="ml-2 cursor-pointer">{item.label}</p>
                </label>
              ))
          }
            
          </div>
      </div>
      
      {/* medicinal uses */}
      <div className='mt-4 flex flex-col gap-4'>
          {/* heading */}
          <div className='pb-2 border-b-1 border-b-[#bcbbbb]'>
            <p className='font-semibold'>Medicinal Uses</p>
          </div>

          {/* checkbox options */}
          <div className='flex flex-wrap gap-4'>
          {
              medicinalUsesOptions.map((item) => (
                <label 
                  key={item.id}
                  htmlFor={item.name} 
                  className={`flex align-items-center p-2 border-2 rounded-full w-fit cursor-pointer
                    ${medicinalUses[item.name] ? 'border-green-500' : 'border-[#bcbbbb]'}
                  `}
                >
                    <input 
                      type='checkbox'
                      id={item.name} 
                      value={category[item.name]}
                      name={item.name}
                      onChange={(e) => handleOptionChange(e, setMedicinalUses)}
                      className='appearance-none '
                    />
                    <p className="ml-2 cursor-pointer">{item.label}</p>
                </label>
              ))
          }
            
          </div>
      </div>

      {/* parts used */}
      <div className='mt-4 flex flex-col gap-4'>
          {/* heading */}
          <div className='pb-2 border-b-1 border-b-[#bcbbbb]'>
            <p className='font-semibold'>Parts Used</p>
          </div>

          {/* checkbox options */}
          <div className='flex flex-wrap gap-4'>
          {
              partsUsedOptions.map((item) => (
                <label 
                  key={item.id}
                  htmlFor={item.name} 
                  className={`flex align-items-center p-2 border-2 rounded-full w-fit cursor-pointer
                    ${partsUsed[item.name] ? 'border-green-500' : 'border-[#bcbbbb]'}
                  `}
                >
                    <input 
                      type='checkbox'
                      id={item.name} 
                      value={category[item.name]}
                      name={item.name}
                      onChange={(e) => handleOptionChange(e, setPartsUsed)}
                      className='appearance-none '
                    />
                    <p className="ml-2 cursor-pointer">{item.label}</p>
                </label>
              ))
          }
            
          </div>
      </div>

      {/* buttons */}
      <div className='mt-8 flex flex-col xs:flex-row gap-4'>
          {/* apply filters */}
          <button
            onClick={handleApplyFilter}
            className='min-w-[150px] py-3 font-[600] bg-[#FFBFAD] rounded-lg hover:bg-[#ffa890] transition-all duration-300 cursor-pointer'
          >
            Apply
          </button>
          
          {/* clear filters */}
          <button
            onClick={clearAllFilter}
            className='min-w-[150px] py-3 font-[600] bg-white hover:bg-[#d1d5dc] rounded-lg transition-all duration-300 cursor-pointer'
          >
            Clear All
          </button>
      </div>

    </div>
  )
}


const FilterHerbs = ({allHerbs, setDisplayHerbs}) => {

  // state to manage input text
  const [inputText, setInputText] = useState('');
  const [placeholderTextIndex, setPlaceholderTextIndex] = useState(0);


  // set different placeholder after every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      // get next index (if last then next will be 0)
      let index = (placeholderTextIndex + 1) % inputPlaceholders.length;
      setPlaceholderTextIndex(index);
    }, 5000);

    return () => clearInterval(intervalId);
  });

  // state to diplay and hide filter options
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  // state to check if any filters have been applied or not
  const [filterApplied, setFilterApplied] = useState(false);

  // state to manage category filter
  const [category, setCategory] = useState({
    'ayurveda': false,
    'yoga&naturopathy': false,
    'unani': false,
    'siddha': false,
    'homeopathy': false,
  });

  // state to manage region filter
  const [region, setRegion] = useState({
    north: false,
    northEast: false,
    east: false,
    west: false,
    south: false,
    central: false,
  });

  // state to manage medicinal uses filter
  const [medicinalUses, setMedicinalUses] = useState({
    'beautycare': false,
    'metabolichealth': false,
    'immunity&infections': false,
    'heart&lungs': false,
    'pain&healing': false,
    'detox&organs': false,
    'mind&wellness': false,
    'reproductivehealth': false,
    'cancer&antioxidants': false,
    'oral&eyecare': false,
    'sexualhealth': false,
  });

  // state to manage parts used filter
  const [partsUsed, setPartsUsed] = useState({
    flowers: false,
    leaves: false,
    roots: false,
    fruits: false,
    seeds: false,
  });

  // function to clear all selected filter options
  const clearAllFilter = () => {
    // function to reset all fileds in a state
    const resetState = (state, setState) => {
      // reset all checked options (if any)
      let tempState = {...state};
      for(const key in tempState) {
        tempState[key] = false;
      }
      setState(tempState);
    }

    // reset all checked categories (if any)
    resetState(category, setCategory);
    // reset all checked regions (if any)
    resetState(region, setRegion);
    // reset all checked medicinal uses (if any)
    resetState(medicinalUses, setMedicinalUses);
    // reset all checked parts used (if any)
    resetState(partsUsed, setPartsUsed);
  }

  // function to filter data according to selected options 
  const handleApplyFilter = () => {
    // function to check if any of the option is selected in filter field
    const anyFieldSelected = (state) => {
      for(const key in state) {
        if(state[key] === true) {
          return true;
        }
      }
      return false;
    }

    // check if any of the category is selected or not
    let anyCategorySelected = anyFieldSelected(category);
    
    let categoriesFilterData = null;
    // filter all herbs that has any one of the selected categories
    if(anyCategorySelected) {
      categoriesFilterData = allHerbs?.filter((herb) => {
        let matched = false;
        JSON.parse(herb.category).forEach((item) => {
            // converet herb category name into the category name that was given in the cateogry state
            // eg. "Yoga & Naturopathy" ==> "yoga&naturopathy"
            const categoryName = item.label.split(' ').join('').toLowerCase();
            if(category[categoryName] === true) {
              matched = true;
            }
          })
  
        if(matched) {
          return herb;
        }
      })
    } else {
      categoriesFilterData = allHerbs;
    }


    // check if any of the herb option is selected
    let anyRegionSelected = anyFieldSelected(region);

    let regionFilterData = null;
    // from categoriesFilter herbs filter herbs that has any of the selected region
    if(anyRegionSelected) {
      regionFilterData = categoriesFilterData?.filter((herb) => {
        let matched = false;
        JSON.parse(herb.regions).forEach((item) => {
          // get region name of herb according to the state
          const name = item.slice(0, item.length-2);
          let regionName = null;
          if(regionsOfIndia.north.includes(name))  regionName = 'east';
          else if(regionsOfIndia.northEast.includes(name))  regionName = 'northEast';
          else if(regionsOfIndia.east.includes(name)) regionName = 'east';
          else if(regionsOfIndia.west.includes(name)) regionName = 'west';
          else if(regionsOfIndia.south.includes(name)) regionName = 'south';
          else  regionName = 'central';

          if(region[regionName] === true) {
            matched = true;
          }
        });
        
        // if curernt region is matched with selected region
        if(matched) {
          return herb;
        }
      });
    } else {
      regionFilterData = categoriesFilterData;
    }


    // check if any of the medicinal uses option is selected
    let anyMedicinalUseSelected = anyFieldSelected(medicinalUses);

    let medicinalUseFilterData = null;
    // from regionFilter herbs filter herbs that has any of the selected medicinal use
    if(anyMedicinalUseSelected) {
      medicinalUseFilterData = regionFilterData?.filter((herb) => {
        let matched = false;
        JSON.parse(herb.uses).forEach((item) => {
            // converet herb use name into the name that was given in the medicinal uses state
            // eg. "Immunity & Infections" ==> "immunity&infections"
            const useName = item.use.split(' ').join('').toLowerCase();
            if(medicinalUses[useName] === true) {
              matched = true;
            }
          })
  
        if(matched) {
          return herb;
        }
      });
    } else {
      medicinalUseFilterData = regionFilterData;
    }


    // check if any of the medicinal uses option is selected
    let anyPartsUsedSelected = anyFieldSelected(partsUsed);

    let partsUsedFilterData = null;
    // from regionFilter herbs filter herbs that has any of the selected medicinal use
    if(anyPartsUsedSelected) {
      partsUsedFilterData = medicinalUseFilterData?.filter((herb) => {
        let matched = false;
        JSON.parse(herb.partsUsed).forEach((item) => {
          const name = item.split(' ').join('').toLowerCase();
          if(partsUsed[name] === true) {
            matched = true;
          }
        });
        if(matched) {
          return herb;
        }
      });
    } else {
      partsUsedFilterData = medicinalUseFilterData;
    }

    // set the displaying data to filtered data
    setDisplayHerbs(partsUsedFilterData);

    // set filter selected or not
    if(
      anyCategorySelected ||
      anyRegionSelected ||
      anyMedicinalUseSelected ||
      anyPartsUsedSelected
    ) {
      setFilterApplied(true);
    } else {
      setFilterApplied(false);
    }

    // hide filter menubar
    setShowFilterOptions(false);

    // scroll to top screen
    window.scroll({top: 0});
  }

  // function to search herb
  const handleSearch = () => {
    // get input text
    const input = inputText.trim().toLowerCase();

    // if empty input
    if(input.length === 0) {
      return;
    }

    // remove all filters
    clearAllFilter();
    setFilterApplied(false);
    setShowFilterOptions(false);

    // helper function to check if any of the herb uses is matching with the input text
    const isAnyUseMatch = (herb) => {
      let matched = false;
      JSON.parse(herb.uses).forEach((item) => {
          // converet herb use name into the name that was given in the medicinal uses state
          // eg. "Immunity & Infections" ==> "immunity&infections"
          const use = item.use.toLowerCase();
          if(use === input
            || use.split(' ').includes(input)
          ) {
            matched = true;
          }
      });

      return matched;
    }

    // helper function to check if any of the herb territory is matching with the input text
    const isAnyStateMatch = (herb) => {
      let matched = false;
      JSON.parse(herb.regions).forEach((item) => {
          const territory = item.slice(0, item.length-2).toLowerCase();
          if(territory === input
            || territory.split(' ').includes(input)
          ) {
            matched = true;
          }
      });

      return matched;
    }

    // filter data
    // (if equals to filed name or includes some part of field name)
    const searchData = allHerbs.filter((herb) => {
      if( herb.commonName.toLowerCase() === input
        || herb.commonName.toLowerCase().split(' ').includes(input) 
        || herb.botanicalName.toLowerCase() === input
        || herb.botanicalName.toLowerCase().split(' ').includes(input) 
        || isAnyUseMatch(herb)
        || isAnyStateMatch(herb)
      ) {
        return herb;
      }
    });

    // set matching data
    setDisplayHerbs(searchData);
  }


  return (
    <div className='flex flex-col gap-2'>

      <div className='w-full flex flex-col xs:flex-row items-center gap-2'>

        {/* input box & filter icon */}
        <div className='flex items-center gap-2 w-full'>
          {/* input box */}
          <div className='w-full relative rounded-full bg-[#e7e7e7] hover:bg-[#dfdfdf] transition-all duration-300'>
              {/* search icon */}
              <span className='absolute left-4 top-3 text-[#767676]'>
                <IoSearchOutline size={25}/>
              </span>

              {/* input box */}
              <input 
                value={inputText}
                placeholder={`search by ${inputPlaceholders[placeholderTextIndex]}`}
                onChange={(e) => setInputText(e.target.value)}
                className='w-full py-3 px-12 rounded-full focus:outline-[#E2D7F9] focus:bg-[#dfdfdf]'  
              />

              {/* clear icon */}
              <span 
                className='absolute right-4 top-3 text-[#767676] cursor-pointer'
                onClick={() => {
                  // now all herbs will be displayed
                  setDisplayHerbs(allHerbs);
                  setInputText('');
                }}
              >
                <IoCloseCircle size={25}/>
              </span>
          </div>

          {/* filter icon */}
          <div 
            className='text-[#686868] cursor-pointer'
            onClick={() => setShowFilterOptions(prev => !prev)}
          >
            <LiaSlidersHSolid size={25}/>
          </div>
        </div>


        {/* search button */}
        <div>
          <button 
            onClick={handleSearch}
            className='px-8 py-3 rounded-full tracking-widest bg-gradient-to-r from-[#D6C3FC] to-[#9CC4FC] hover:bg-gradient-to-r hover:from-[#c1a6f8] hover:to-[#85b7fd] cursor-pointer'
          >
            Search
          </button>
        </div>

      </div>

      {/* filter options container */}
      {
        showFilterOptions && (
          <FilterOptionsContainer
            setShowFilterOptions={setShowFilterOptions}
            category={category}
            setCategory={setCategory}
            region={region}
            setRegion={setRegion}
            medicinalUses={medicinalUses}
            setMedicinalUses={setMedicinalUses}
            partsUsed={partsUsed}
            setPartsUsed={setPartsUsed}
            handleApplyFilter={handleApplyFilter}
            clearAllFilter={clearAllFilter}
          />
        )
      }

      {/* reset all filters button */}
      <div>
        {
          filterApplied && (
            <div className='flex items-center justify-center gap-2 sm:gap-6'>
              <button
                onClick={() => {
                  clearAllFilter();
                  setDisplayHerbs(allHerbs);
                  setFilterApplied(false);
                }}
                className='cursor-pointer font-semibold tracking-widest text-red-400 hover:text-red-500 transition-all duration-300'
              >
                Reset all filter
              </button>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default FilterHerbs