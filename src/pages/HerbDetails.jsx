import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getHerbDetails } from '../services/operations/herbsAPIs';

import HerbMedia from '../components/core/herbMedia/Index';
import HerbInformation from '../components/core/herbInformation/Index';


const HerbDetails = () => {

    // get herbId from params
    const {herbId} = useParams();

    const [herb, setHerb] = useState(null);

    // call API to get herb details
    useEffect(() => {
        const fetchHerbDetails = async () => {
          const result = await getHerbDetails(herbId);
          setHerb(result);
        }

        fetchHerbDetails();
    }, []);

  // display loader
  if(!herb) {
    return (
      <div className='flex items-center justify-center h-screen'>
            <div className='loader'></div>
      </div>
    );
  }

  return (
    <main>
      <div className='py-20 w-11/12 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8'>

          {/* Herb Media */}
          <HerbMedia herb={herb}/>

          {/* Herb Information */}
          <HerbInformation herb={herb}/>

      </div>
    </main>

  )
}

export default HerbDetails