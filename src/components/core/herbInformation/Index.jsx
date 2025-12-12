import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

// components
import AddNote from './AddNote';

// icons
import { FiBookmark, FiHeart } from "react-icons/fi";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// APIs
import { bookmarkHerb, likeHerb, removeBookmarkHerb, unlikeHerb } from '../../../services/operations/herbsAPIs';
import { setLoading } from '../../../slices/authSlice';


// tab menu options
const tabOptions = [
    {
      name: 'Description',
      keyword: 'fullDescription',
      type: 'string',
      id: 0,
    },
    {
      name: 'Parts Used',
      keyword: 'partsUsed',
      type: 'chipInput',
      id: 1,
    },
    {
      name: 'Uses',
      keyword: 'uses',
      type: "objectArrayInput",
      id: 2,
    },
    {
      name: 'Regions',
      keyword: '',
      type: '',
      id: 3,
    },
    {
      name: 'Cultivation Method',
      keyword: 'cultivation',
      type: 'multiInput',
      id: 4,
    },
    {
      name: 'Add Note',
      keyword: '',
      type: '',
      id: 5,
    },
]

const HerbInformation = ({herb}) => {

  const [activeTab, setActiveTab] = useState(tabOptions[0]);

  const tabOptionsRef = useRef(null);

  const {user} = useSelector((state) => state.profile);
  const {token, loading} = useSelector((state) => state.auth);

  const {herbId} = useParams();
  
  const dispatch = useDispatch();

  // function to bookmark/un-bookmark a herb
  const handleBookmarkHerb = async () => {
    // if user is not logged in
    if(!token) {
      toast.error("Your must be logged in");
      return
    }

    dispatch(setLoading(true));

    // if herb already bookmarked then call remove bookmark API
    if(user.bookmarks.includes(herbId)) {
        await removeBookmarkHerb(herbId, token, dispatch);
    } else {
      // call bookmark herb API
      await bookmarkHerb(herbId, token, dispatch);
    }

   dispatch(setLoading(false));
  }

  // function to like/unline a herb
  const handleLikeHerb = async () => {
    // if user is not logged in
    if(!token) {
      toast.error("Your must be logged in");
      return
    }

    dispatch(setLoading(true));

    // if herb already liked then call unlike API
    if(user.likes.includes(herbId)) {
        await unlikeHerb(token, herbId, dispatch);
    } else {
      // call like herb API
      await likeHerb(token, herbId, dispatch);
    }

    dispatch(setLoading(false));
  }

  return (
    <section className='p-2 sm:p-8 flex flex-col gap-4'>
    
        {/* herb name & bookmark, like */}
        <div className='flex flex-col xs:flex-row  space-y-2 justify-between items-baseline'>
            {/* herb name */}
            <div>
              <p className='text-2xl sm:text-3xl font-semibold'>
                {herb?.botanicalName}
              </p>

              <p className='text-lg sm:text-xl italic text-richblack-400 font-semibold'>
                {herb?.commonName}
              </p>
            </div>

            {/* buttons */}
            <div className='flex gap-2'>
              {/* bookmark button */}
              <button 
                className='group cursor-pointer'
                disabled={loading}
                onClick={handleBookmarkHerb}
              >

                <FiBookmark 
                  size={24}
                  className={`group-hover:fill-yellow-50
                    ${token && user?.bookmarks.includes(herbId) ? 'fill-yellow-50' : ''}`}
                />
              </button>
              
              {/* like button */}
              <button 
                className='group cursor-pointer'
                disabled={loading}
                onClick={handleLikeHerb}
              >

                <FiHeart 
                  size={24}
                  className={`group-hover:fill-red-400
                    ${token && user?.likes.includes(herbId) ? 'fill-red-400' : ''}`}
                />
              </button>
            </div>
        </div>

        {/* Tab menu */}
        <div className='relative'>

          <div 
            ref={tabOptionsRef}
            className='flex gap-6 overflow-auto scroll-smooth hideScrollBar' 
          >
            {/* scroll left button */}
            <div 
              className='absolute -left-8 -translate-y-1.5 text-gray-400 hover:text-gray-600 text-4xl cursor-pointer transition-all duration-300'
              onClick={() => tabOptionsRef.current.scrollLeft -= 150}    
            >
              <FaAngleLeft/>
            </div>

            {/* scroll right button */}
            <div 
              className='absolute -right-8 -translate-y-1.5 text-gray-400 hover:text-gray-600 text-4xl cursor-pointer transition-all duration-300'
              onClick={() => tabOptionsRef.current.scrollLeft += 150}
            >
              <FaAngleRight/>
            </div>

            {
                tabOptions.map((item, index) => (
                  <div 
                    key={item.id}
                    onClick={() => setActiveTab(item)} 
                    className={
                      `${activeTab.id === index ? 'text-orange-600' : ''}
                      cursor-pointer font-semibold uppercase text-nowrap hover:text-orange-600 transition-all duration-200`
                    } 
                  >
                    {item.name}
                  </div>
                ))
            }
          </div>
        </div>

        {/* herb details according to current tab option */}
        <div className='max-h-[50vh] overflow-auto px-4'>
          {   
              // render herb parts used
              activeTab.type === 'chipInput' ? (
                <ul>
                  {
                    JSON.parse(herb?.[activeTab.keyword]).map((item, index) => (
                      <li className='list-disc' key={index}>
                        {item}
                      </li>
                    ))
                  }
                </ul>
              ) : activeTab.type === 'objectArrayInput' ? (
                // render herb uses
                <div>
                    <Table className='border-1'>
                        {/* table header */}
                        <Thead>
                          <Tr>
                            <Th className='border-r-1'>Use</Th>
                            <Th>Description</Th>
                          </Tr>
                        </Thead>

                        {/* table body */}
                        <Tbody>
                        {
                          JSON.parse(herb?.[activeTab.keyword]).map((item, index) => (
                            <Tr key={index} className='border-1'>
                              <Td className='border-r-1 px-2 py-4'>{item.use}</Td>
                              <Td className='px-2'>{item.description}</Td>
                            </Tr>
                          ))
                        }
                        </Tbody>
                    </Table>
                </div>
              ) : activeTab.type === 'multiInput' ? (
                // render herb cultivation method
                <div>
                  <ul className='flex flex-col gap-2'>
                    {
                      JSON.parse(herb?.[activeTab.keyword]).map((item, index) => (
                        <li 
                          key={index}
                          className='list-disc'
                        >
                            {item.text}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              ) : (
                <div>
                  <p>{herb?.[activeTab.keyword]}</p>
                </div>
              )
          }

          {/* add note component */}
          {
            activeTab.name === 'Add Note' && (
              <div>
                <AddNote/>
              </div>
            )
          }

          {/* regions component */}
          {
            activeTab.name === 'Regions' && (
              <div>
                {/* region names */}
                <div className='flex gap-2 flex-wrap'>
                  {
                    JSON.parse(herb.regions).map((data, index) => (
                      <p key={index}>
                        {data.slice(0, data.length-2)}
                        {index !== JSON.parse(herb.regions).length-1 && ", "}
                      </p>
                    ))
                  }
                </div>

                {/* view heatmap link */}
                <div className='mt-4 italic text-blue-400 font-semibold text-lg'>
                  <Link to={`/herbs/heatmap/${herb._id}`} target="_blank">
                    View Heatmap
                  </Link>
                </div>
              </div>
            )
          }
          
        </div>

    </section>
  )
}

export default HerbInformation;