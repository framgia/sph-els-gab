import React, { useEffect, useState } from 'react'
import { useAuth } from '../services/AuthProvider'
import { navigation } from '../constants/navigation' 
import NavbarItem from './NavbarItem'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaTimes } from 'react-icons/fa'
import UserAvatar from './UserAvatar'
import SidebarImage from '../assets/images/SidebarImage.png'

const Sidebar = () => {
    const { loggedIn, logout, isAdmin } = useAuth()

    const [adminNav, setAdminNav] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)

    useEffect(() => {
      if (loggedIn) {
        setAdminNav(isAdmin)
      }
    }, [loggedIn, isAdmin])

    return (
        <aside id='sidebar' className={`w-60 h-screen absolute z-10 bg-slate-50 flex flex-col ${showSidebar ? 'active' : ''}`} aria-label='Sidebar'>
            <button
                className={`px-2 h-full bg-primary-base hover:bg-primary-hover absolute sidebar-btn ${showSidebar ? 'active' : ''}`}
                onClick={() => {
                    setShowSidebar(!showSidebar)
                }}>
                { showSidebar ? <FaTimes className='text-lg text-white' /> : <GiHamburgerMenu className='text-lg text-white' /> }
            </button>
            <div className='overflow-y-auto pb-4 flex-1'>
                <div className='flex items-center bg-primary-base' style={{ backgroundImage: `url(${SidebarImage})`, backgroundPosition: 'top right', height: '150px' }}>
                    <a href="https://flowbite.com/" target='_blank' className="px-3 pl-11 text-md font-bold text-white">
                        E-LEARNING PH
                    </a>
                </div>
                <ul>
                    {
                        !loggedIn ?
                            navigation.unauthenticated.map((item, index) => {
                                return (
                                    <NavbarItem
                                        key={ index }
                                        name={ item.name }
                                        icon={ item.icon }
                                        path={ item.path }
                                        hasDropDown={ item.hasDropDown } />
                                )
                            })
                        :
                            <>
                                {
                                    navigation.authenticated.map((item, index) => {
                                    if (!adminNav) {
                                        if (item.adminOnly) {
                                            return
                                        }
                                    }

                                    return (
                                        <NavbarItem
                                            key={ index }
                                            name={ item.name }
                                            icon={ item.icon }
                                            path={ item.path }
                                            hasDropDown={ item.hasDropDown }
                                            children={ item.submeu } />
                                        )
                                    })
                                }
                            </>
                    }
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar
