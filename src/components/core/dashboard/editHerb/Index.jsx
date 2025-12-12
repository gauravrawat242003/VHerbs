import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

import { setEditHerb, setHerb, setStep } from '../../../../slices/herbSlice';

// components
import { RenderSteps } from '../addHerb/RenderSteps';

// APIs
import { getHerbDetails } from '../../../../services/operations/herbsAPIs';

const EditHerb = () => {
  
  const [herbData, setHerbData] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // get herb id from params
  const {herbId} = useParams();
  
  // function to fetch herbs details
  const fetchHerb = async () => {
    setLoading(true);

    // call api to get herb data
    const result = await getHerbDetails(herbId);

    if(result) {
      setHerbData(result);

      // set herb in slice
      dispatch(setHerb(result));
      dispatch(setEditHerb(true));
      dispatch(setStep(1));
    }

    setLoading(false);
  }

  // get herbs details when herbId changes
  useEffect(() => {
    if(herbId) {
      fetchHerb();
    }
  }, [herbId]);


  return (
    <div className='py-20 mx-auto flex flex-col'>
      {/* heading */}
      <h1 className="mb-14 text-3xl font-medium">
        Edit Herb
      </h1>
        
      {/* render add herb steps using herb data to edit */}
      <div>
        {
          loading ? (
            <div className='flex items-center justify-center h-[60vh]'>
              <div className='loader'></div>
            </div>
            )
          : herbData ? (<RenderSteps/>) 
          : (
              <div>Herb not found</div>
          )
        }
      </div>
    </div>

  )
}

export default EditHerb