import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'

// icons
import { TiArrowSortedDown } from "react-icons/ti";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { RiDashboard2Line } from "react-icons/ri";

// components
import useComponentVisible from '../../hooks/useComponentVisible';
import MobileSidebar from './MobileSidebar';

// utility functions
import { navigateToRoute } from '../../utils/routeNavigator';

// icons
import { MdHome, MdPermContactCalendar } from 'react-icons/md';
import { GiTreeBranch } from 'react-icons/gi';

// APIs
import { logout } from '../../services/operations/authAPIs';
import { RiTeamFill, RiLogoutCircleLine } from 'react-icons/ri';

// navbar links
const navLinks = [
  {
    name: "Home",
    route: "/",
    icon: MdHome,
    iconSize: 25,
    id: 0,
  },
  {
    name: "Explore Herbs",
    route: "/herbs",
    icon: GiTreeBranch,
    iconSize: 25,
    id: 1,
  },
  {
    name: "About us",
    route: "/about-us",
    icon: RiTeamFill,
    iconSize: 25,
    id: 2,
  },
  {
    name: "Contact",
    route: "/contact",
    icon: MdPermContactCalendar,
    iconSize: 25,
    id: 3,
  },
]

const Navbar = () => {
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);

  // menu bar for smaller screens
  const [menuBarVisible, setMenuBarVisible] = useState(false);

  // for dashboard & logout dropdown menu
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // call logout API
  const handleLogout = () => {
    logout(dispatch, navigate);
  }

  // to highlight navbar option according to current page 
  const pathMatch = (path) => {
    const currentPath = location.pathname;
    return matchPath(currentPath, path);
  }

  return (
    <div 
      className={`py-2 md:py-0 z-[999] flex items-center justify-center border-b-[1px] fixed w-full
        ${pathMatch('/about-us') 
        ? 'bg-[#2b2d42] text-white border-b-transparent' 
        : pathMatch('/') 
        ? 'bg-transparent text-[rgb(131,116,225)] border-b-[#46388E]' 
        : 'bg-[#F6F6F6] border-b-richblack-50'}
      `}
    >
      <div className='w-11/12 max-w-[1280px] mx-auto flex items-center justify-between'>

        {/* logo*/}
        <div>
          <Link to="/" 
            className='text-2xl font-bold flex items-center gap-1'>
            <img 
              src='https://res.cloudinary.com/dmxrsreim/image/upload/v1745686335/logo_oo0nvt.png'
              className={`w-[40px] rounded-full 
              ${pathMatch('/') && 'opacity-60'}`}
            />
            <p>VHerbs</p>
            </Link>
        </div>

        {/* nav links */}
        <div className='w-[80%] hidden md:flex justify-center gap-6'>
          {
              navLinks.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => navigateToRoute(navigate, item.route)}
                    className={`p-1 cursor-pointer flex flex-col gap-1 items-center rounded-lg  transition-all duration-300 group`}
                  >

                      {/* icon */}
                      <Link className={`rounded-full p-1 focus:outline-2
                        ${pathMatch('/') ? 'focus:outline-[#68609f]' : 'focus:outline-[#93c7fc]'}`}>
                        <item.icon 
                          size={item.iconSize} 
                          className={` transition-all duration-300
                          ${pathMatch(item.route) && 'fill-[#55a7fa]'}
                          ${pathMatch(item.route) && pathMatch('/') && 'fill-[#68609f]'}
                          ${pathMatch('/') ? 'group-hover:fill-[#68609f]' : 'group-hover:fill-[#55a7fa]'}
                          `}
                        />
                      </Link>
                      
                      {/* text */}
                      <p 
                        className={`px-2 rounded-full transition-all duration-300 group-hover:text-white
                          ${pathMatch(item.route) && 'bg-[#55a7fa] text-white'}
                          ${pathMatch(item.route) && pathMatch('/') && 'bg-[#68609f]'}
                          ${pathMatch('/') ? 'group-hover:bg-[#68609f]' : 'group-hover:bg-[#55a7fa]'}
                        `}
                      >
                        {item.name}
                      </p>
                  </div>
              ))
          }
        </div>

        
        {/* login or my profile button */}
        <div>
          {
            token ? (
              <div>
                <div 
                  ref={ref}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsComponentVisible(prev => !prev);
                  }}
                  className='hidden md:flex justify-center items-center'
                >
                  {/* user image and name */}
                  <div 
                    className='realative flex items-center gap-2 cursor-pointer' 
                  > 

                    {/* user image */}
                    <div className='w-[30px] h-[30px] rounded-full'>
                      <img
                        src={user?.additionalDetails?.image 
                          ? user?.additionalDetails?.image
                          : `https://api.dicebear.com/9.x/initials/svg?seed=${user.firstName}+${user?.lastName}`}
                        className='w-full h-full object-cover rounded-full'
                      />
                    </div>

                    {/* user name */}
                    <div>
                      <p 
                        className={`
                          ${pathMatch('/') 
                          ? 'text-[#8374e1]' 
                          : 'text-richblack-400'}
                        `}
                      >
                        {user?.firstName?.slice(0, 10)}
                      </p>
                    </div>

                    {/* dropdown arrow icon */}
                    <div className={`${isComponentVisible  ? 'rotate-180' : ''} transition-all duration-200`}
                    >
                      <TiArrowSortedDown />
                    </div>

                    
                  </div>
                  
                  {/* drop down options */}
                  {
                    isComponentVisible  ? (
                      <div 
                        ref={ref}
                        className={`absolute -bottom-16 -translate-x-2 text-black rounded-md overflow-hidden
                          ${pathMatch('/') ? 'bg-[#8374e1]' 
                          : 'bg-[#5acaff]'}
                        `}
                      >
                        {/* dashboard */}
                        <p 
                          onClick={() => navigate('/dashboard/my-profile')}
                          className={`p-2 px-2 border-b-[1px] flex items-center gap-1 cursor-pointer transition-all duration-200
                            ${pathMatch('/') ? 'hover:bg-[#9d91e7] border-b-[#68609F]' 
                            : 'hover:bg-[#96ddff] border-b-[#b4e7ff]'}
                          `}
                        >
                          <RiDashboard2Line size={18}/>
                          Dashboard
                        </p>

                        {/* logout */}
                        <p 
                          onClick={handleLogout}
                          className={`p-2 px-2 flex items-center gap-1 cursor-pointer transition-all duration-20
                            ${pathMatch('/') ? 'hover:bg-[#9d91e7]' : 'hover:bg-[#78d4ff]'}
                          `}
                        >
                          <RiLogoutCircleLine size={18}/>
                          Logout
                        </p>
                      </div>
                    ) : <></>
                  }


                </div>
              </div>
            ) 
            // login button
            : (
              <div className='hidden md:flex'>
                <button 
                  onClick={() => navigateToRoute(navigate, '/login')}
                  className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-1 focus:outline-none focus:ring-green-300 cursor-pointer'
                >
                  <span className={`relative px-5 py-2.5 transition-all ease-in duration-75 
                    ${pathMatch('/') ? 'text-white' : 'bg-[#F6F6F6] text-black group-hover:text-white'}
                   rounded-md group-hover:bg-transparent `}>
                    Login
                  </span>
                </button>
              </div>
            )
          }
        </div>

        
        {/* ham burger icon */}
        <div
          onClick={() => setMenuBarVisible((prev) => !prev)}
          className='cursor-pointer md:hidden'
        >
          <HiMiniBars3BottomRight size={20}/>
        </div>

      </div>
      
      {/* nav bar for smaller screens */}
      {
        menuBarVisible && (
          <MobileSidebar 
            visible={menuBarVisible} 
            setVisible={setMenuBarVisible}
            />
        )
      }

    </div>

  )
}

export default Navbar