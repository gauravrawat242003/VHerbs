import React, { useState } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

// icons
import { GiHerbsBundle } from "react-icons/gi";
import { IoAddSharp } from "react-icons/io5";
import { CiUser, CiBookmark, CiSettings } from "react-icons/ci";
import { FaRegNoteSticky } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";

// components
import { ConfirmationModal } from '../../common/ConfirmationModal';

// constants
import {ACCOUNT_TYPE} from '../../../utils/constants';

// APIs
import { logout } from '../../../services/operations/authAPIs';

// options for sidebar
const sideBarOptions = [
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


const SideBar = () => {

    const [confirmationModalData, setConfirmationModalData] = useState(null);
    
    const {user} = useSelector((state) => state.profile);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // fucntion to match path to highlight current active menubar option
    const pathMatch = (text) => {
        const path = "/dashboard/" + text.replace(" ", "-");
        return matchPath(location.pathname, path);
    }

    // function to navigate to different page according to option clicked on menubar
    const handleOptionClick = (text) => {
        // get route path
        const path = text.replace(" ", "-");

        // navigate to route
        navigate(`/dashboard/${path}`);
    }

    // function to logout account
    const handleLogout = () => {
        logout(dispatch, navigate);
        setConfirmationModalData(null);
    }


  return (
    <>
        <div className='py-20 hidden md:flex min-w-[222px] flex-col min-h-screen border-r-1 border-r-richblack-50'>
            {/* sidebar */}
            <div className='fixed min-w-[222px]'>
                {
                    sideBarOptions.map((item) => (
                        <div 
                            key={item.id}
                            className={`
                                mr-[1px] font-semibold hover:text-[#2D9CF4] hover:bg-[#EBF5FF]
                                ${pathMatch(item.text) 
                                ? 'text-[#2D9CF4] font-semibold' 
                                : 'text-richblack-300'}
                            `}      
                        >
                            {/* user only options */}
                            {
                                item.text !== 'logout' && item.userCanAccess && user.accountType === ACCOUNT_TYPE.USER && (
                                    <div 
                                        className='px-8 py-4 flex items-center gap-2 capitalize cursor-pointer'
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
                                        className='px-8 py-4 flex items-center gap-2 capitalize cursor-pointer'
                                        onClick={() => handleOptionClick(item.text)}
                                    >
                                        <span><item.icon size={item.iconSize}/></span>
                                        <p>{item.text}</p>
                                    </div>
                                )
                            }

                            {/* logout option */}
                            {
                                item.text === "logout" && (
                                    <div 
                                        className='flex items-center gap-2 px-8 py-4 text-[#E45A69] hover:text-red-600 hover:bg-[#ffeeee] cursor-pointer transition-all duration-300'
                                        onClick={() => setConfirmationModalData({
                                            header: "Are you sure ?",
                                            message: "You will be logged out of your account",
                                            acceptText: "Logout",
                                            rejectText: "Cancel",
                                            accept: handleLogout,
                                            reject: () => setConfirmationModalData(null), 
                                        })}
                                    >
                                        <span><item.icon size={item.iconSize}/></span>
                                        <p className='capitalize font-semibold'>{item.text}</p>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }

            </div>

        </div>
            
        {/* confirmation modal for log out */}
        {
            confirmationModalData && (
                <ConfirmationModal confirmationModalData={confirmationModalData}/>
            )
        }
    </>
    

  )
}

export default SideBar