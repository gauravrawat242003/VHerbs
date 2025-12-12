import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

// importing loader css
import '../../common/loader.css';

// components
import HeatMap from './HeatMap';

// APIs
import { getHerbDetails } from '../../../services/operations/herbsAPIs';


const HeatMapWrapper = () => {

    // get herbId from params
    const {herbId} = useParams();

    const [loading, setLoading] = useState(true);
    const [herb, setHerb] = useState(null);

    // fetch herb data
    useEffect(() => {
        const fetchHerbData = async () => {
            setLoading(true);
            const response = await getHerbDetails(herbId);
            if(response) {
                setHerb(response);
            }
            setLoading(false);
        }
        
        fetchHerbData();
    }, [herbId]);
    
    // display loader
    if(loading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                    <div className='loader'></div>
            </div>
        )
    }

  // display heatmap
  return (
    <div className='pt-14'>
        <HeatMap herb={herb}/>
    </div>
  )
}

export default HeatMapWrapper