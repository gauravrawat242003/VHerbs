import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath, useLocation, useNavigate } from 'react-router-dom';


// utility functions & constants
import { navigateToRoute } from '../../utils/routeNavigator';
import { ACCOUNT_TYPE } from '../../utils/constants';

// icons
import { GiHerbsBundle } from "react-icons/gi";
import { IoAddSharp } from "react-icons/io5";
import { CiUser, CiBookmark, CiSettings } from "react-icons/ci";
import { FaRegNoteSticky } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GiTreeBranch } from "react-icons/gi";
import { MdHome, MdPermContactCalendar } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";

// prime react components
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Sidebar } from 'primereact/sidebar';

// Components
import { ConfirmationModal } from './ConfirmationModal';

// APIs
import { logout } from '../../services/operations/authAPIs';

// menu bar options for dashboard menu
const dashboardOptions = [
    {
        text: "my profile",
        id: 1,
        userCanAccess: true,
        adminCanAccess: true,
        icon: CiUser,
        iconSize: 25,
    },
    {
        text: "manage herbs",
        id: 2,
        userCanAccess: false,
        adminCanAccess: true,
        icon: GiHerbsBundle,
        iconSize: 25,
    },
    {
        text: "add herb",
        id: 3,
        userCanAccess: false,
        adminCanAccess: true,
        icon: IoAddSharp,
        iconSize: 25,
    },
    {
        text: "bookmarks",
        id: 4,
        userCanAccess: true,
        adminCanAccess: false,
        icon: CiBookmark,
        iconSize: 25,
    },
    {
        text: "notes",
        id: 5,
        userCanAccess: true,
        adminCanAccess: false,
        icon: FaRegNoteSticky,
        iconSize: 25,
    },
    {
        text: "settings",
        id: 6,
        userCanAccess: true,
        adminCanAccess: true,
        icon: CiSettings,
        iconSize: 25,
    },
    {
        text: "logout",
        id: 7,
        userCanAccess: true,
        adminCanAccess: true,
        icon: RiLogoutCircleLine,
        iconSize: 25,
    }
]


const MobileSidebar = ({visible, setVisible}) => {

    const [confirmationModalData, setConfirmationModalData] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);

    // match math to highlihgt option on menubar
    const pathMatch = (text) => {
        const path = "/dashboard/" + text.replace(" ", "-");
        return matchPath(location.pathname, path);
    }

    // go to specific page route
    const handleOptionClick = (text, dashboardRoute=true) => {
        // get route path
        const path = text.replace(" ", "-");

        // navigate to route
        if(dashboardRoute) {
            navigateToRoute(navigate, `/dashboard/${path}`);
        } else {
            navigateToRoute(navigate, `/${path}`);
        }

        // hide menu bar
        setVisible(false);
    }

    // calls logout API
    const handleLogout = () => {
        // call API
        logout(dispatch, navigate);

        // hide modal
        setConfirmationModalData(null);
        // hide navbar
        setVisible(false);
    }

    // custom header tempalte for sidebar
    const headerTemplate = () => {
        return (
            <div>
                <p className='font-bold text-xl'>VHerbs</p>
            </div>
        )
    }

    // template for dashboard accordion
    const dashboardHeaderTemplate = () => {
        return (
            <div className='flex gap-2 items-center'>
                {/* <HiSquares2X2 size={20}/> */}
                <img src={user?.additionalDetails?.image ? user?.additionalDetails?.image
                    : `https://api.dicebear.com/9.x/initials/svg?seed=${user.firstName}+${user?.lastName}`}
                    className='h-[30px] w-[30px] rounded-full object-cover'
                />
                <p>Dashboard</p>
            </div>

        )
    }

  return (
    <div>
        <Sidebar 
            position="right"
            header={headerTemplate}
            visible={visible} 
            onHide={() => setVisible(false)}
            className='max-w-[260px]'
        >

        <div className='flex flex-col gap-1 text-richblack-200 mt-1'>

            {/* home */}
            <div
                onClick={() => handleOptionClick('', false)}
                className={`cursor-pointer flex gap-2 items-center hover:text-[#2D9CF4] hover:bg-[#EBF5FF] px-2 py-3 rounded-md transition-colors duration-300 focus:outline-1 focus:outline-sky-400
                    ${location.pathname === '/' && 'text-[#2D9CF4] font-semibold'}
                `}
            >
                <MdHome size={25}/>
                Home
            </div>

            {/* explore herbs */}
            <div
                onClick={() => handleOptionClick('herbs', false)}
                className={`cursor-pointer flex gap-2 items-center hover:text-[#2D9CF4] hover:bg-[#EBF5FF] px-2 py-3 rounded-md transition-colors duration-300 focus:outline-1 focus:outline-sky-400
                    ${location.pathname === '/herbs' && 'text-[#2D9CF4] font-semibold'}
                `}
            >
                <GiTreeBranch size={25}/>
                Explore Herbs
            </div>

            {/* dashboard options */}
            {
                user && 
                <Accordion multiple className='w-full' activeIndex={0}>
                    <AccordionTab header="Dashboard" headerTemplate={dashboardHeaderTemplate}>
                        {
                            dashboardOptions.map((item) => (
                                <div 
                                    key={item.id}
                                    className={`${pathMatch(item.text) 
                                        ? 'text-[#2D9CF4] font-semibold' 
                                        : 'text-richblack-200'}
                                        text-sm font-semibold px-2 rounded-md hover:text-[#2D9CF4] hover:bg-[#E8FAEA]`}    
                                >
                                    {/* user only options */}
                                    {
                                        item.text !== 'logout' && item.userCanAccess && user.accountType === ACCOUNT_TYPE.USER && (
                                            <div 
                                                className='py-2 flex items-center gap-2 capitalize cursor-pointer rounded-lg focus:outline-1 focus:outline-green-300'
                                                onClick={() => handleOptionClick(item.text)}
                                            >
                                                <span><item.icon size={item.iconSize}/></span>
                                                <p>{item.text}</p>
                                            </div>
                                        )
                                    }

                                    {/* admin only options */}
                                    {
                                        item.text !== 'logout' && item.adminCanAccess && user.accountType === ACCOUNT_TYPE.ADMIN && (
                                            <div 
                                                className='py-2 flex items-center gap-2 capitalize cursor-pointer rounded-lg focus:outline-1 focus:outline-green-300'
                                                onClick={() => handleOptionClick(item.text)}
                                            >
                                                <span><item.icon size={item.iconSize}/></span>
                                                <p>{item.text}</p>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </AccordionTab>

                </Accordion>
            }

            {/* about us */}
            <div
                onClick={() => handleOptionClick('about-us', false)}
                className={`cursor-pointer flex gap-2 items-center hover:text-[#2D9CF4] hover:bg-[#EBF5FF] px-2 py-3 rounded-md transition-colors duration-300 focus:outline-1 focus:outline-sky-400
                    ${location.pathname === '/about-us' && 'text-[#2D9CF4] font-semibold'}
                `}
            >
                <RiTeamFill size={25}/>
                About us
            </div>

            {/* contact */}
            <div
                onClick={() => handleOptionClick('contact', false)}
                className={`cursor-pointer flex gap-2 items-center hover:text-[#2D9CF4] hover:bg-[#EBF5FF] px-2 py-3 rounded-md transition-colors duration-300 focus:outline-1 focus:outline-sky-400
                    ${location.pathname === '/contact' && 'text-[#2D9CF4] font-semibold'}
                `}
            >   
                <MdPermContactCalendar size={25}/>
                Contact
            </div>

            {/* login or logout button */}
            {
                token ? (
                    <div 
                        className='mt-6'
                        onClick={() => setConfirmationModalData({
                            header: "Are you sure ?",
                            message: "You will be logged out of your account",
                            acceptText: 'Logout',
                            rejectText: 'Cancel',
                            accept: handleLogout,
                            reject: () => setConfirmationModalData(null), 
                        })}
                    >
                        <button 
                            className='w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-red-300 via-rose-500 to-red-500 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white  focus:ring-1 focus:outline-none focus:ring-pink-200 cursor-pointer'
                    >   
                            <span 
                                className='w-full px-5 py-2.5 transition-all duration-300 bg-[#F6F6F6] text-black rounded-md group-hover:bg-transparent group-hover:text-white'
                            >
                                Logout
                            </span>
                        </button>
                    </div>
                ) : (
                    <div 
                        onClick={() => {
                            navigateToRoute(navigate, '/login');
                            setVisible(false);
                        }}
                        className='flex justify-center mt-6'
                    >
                        <button 
                            className='inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-2 focus:outline-none focus:ring-green-300 cursor-pointer w-full'
                        >
                            <span 
                                className='px-5 py-2.5 transition-all ease-in duration-75 bg-[#F6F6F6] text-black rounded-md group-hover:bg-transparent group-hover:text-white w-full'
                            >
                                Login
                            </span>
                        </button>
                    </div>
                )
            }
        </div>
        
        </Sidebar>

        {/* confirmation modal for logout */}
        {
            confirmationModalData && (
                <ConfirmationModal confirmationModalData={confirmationModalData}/>
            )
        }
    </div>
  )
}

export default MobileSidebar
