import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../services/AuthProvider'
import { TbBellRinging } from 'react-icons/tb'
import { BsGearFill } from 'react-icons/bs'
import { FaRegEnvelope, FaSearch } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'
import apiClient from '../services/api'
import UserAvatar from './UserAvatar'
import Toastify from '../core/Toastify'

const Topbar = ({page}) => {
    const { logout } = useAuth()

    const location = useLocation()
    const navigate = useNavigate()

    const [user, setUser] = useState({
        avatar: '',
        firstname: '',
    })
    const [time, setTime] = useState(Date.now())
    const [accountDropdown, setAccountDropdown] = useState(false)

    useEffect(() => {
        apiClient({
            method: "get",
            url: "/api/user"
        }).then(response => {
            setUser(response.data)
        }).catch(error => {
            Toastify("error", error)
        })
    }, [])

    const getGreetings = useCallback(() => {
        const dt = new Date(time).getHours()
        return dt <= 11 ? 'Good morning' : dt >= 12 && dt <= 17 ? 'Good afternoon' : 'Good evening'
    }, [time])

    return (
        <div id='welcome-banner' className='flex px-8 items-center' style={location.pathname === '/dashboard' ? {height: '130px'} : {height: '60px'}}>
            <div>
                {
                    location.pathname === '/dashboard' ?
                        <>
                            <h4 className='font-medium text-xl text-left text-white'>{ getGreetings() }, { user.firstname }</h4>
                            <h5 className='text-white font-normal text-md'>Let's get started!</h5>
                        </>
                    :
                        <h4 className='font-medium text-xl text-left text-white'>E-LEARNING PH - { location.pathname.split('/')[1].toUpperCase() }</h4>
                }
            </div>
            <div className='flex-1 px-10'>
                {
                    location.pathname === '/dashboard' ? 
                        <div className='w-3/4 mx-auto search-container relative'>
                            <FaSearch className='absolute search-icon' />
                            <input type='text' className='rounded-full w-full py-2 px-3 focus:outline-0' placeholder='SEARCH...'/>
                        </div>
                    : ''
                }
            </div>
            <div>
                <div className='flex items-center'>
                    {
                        location.pathname === '/dashboard' ? '' : <FaSearch className='text-white text-lg font-normal mr-4 hover:text-slate-300 hover:cursor-pointer' />
                    }
                    <FaRegEnvelope className={`text-white ${location.pathname ==='/dashboard' ? 'text-2xl' : 'text-lg'} font-normal mr-4 hover:text-slate-300 hover:cursor-pointer`} />
                    <TbBellRinging className={`text-white ${location.pathname ==='/dashboard' ? 'text-2xl' : 'text-lg'} font-normal mr-4 hover:text-slate-300 hover:cursor-pointer`} />
                    <div className='relative'>
                        <div className='avatar-section relative rounded-full mb-2 mr-4'>
                            <div
                                className='overlay h-full w-full absolute hover:cursor-pointer'
                                onClick={() => setAccountDropdown(!accountDropdown)}/>
                            <UserAvatar
                                avatar={ user.avatar }
                                setHeight={`${page ==='dashboard' ? '50px' : '35px'}`}
                                setWidth={`${page ==='dashboard' ? '50px' : '35px'}`} />
                        </div>
                        <div className={`absolute right-5 bg-white rounded-md shadow-md ${accountDropdown ? 'block' : 'hidden'} account-dropdown`} style={{ minWidth: '160px' }}>
                            <ul className="flex flex-col text-md font-normal">
                                <li className='w-full'>
                                    <button className='w-full px-4 py-2 hover:bg-primary-hover hover:text-white flex items-center' onClick={() => navigate('/settings')}>
                                        <BsGearFill className='text-md font-normal mr-2'/>Account Settings
                                    </button>
                                </li>
                                <li className='w-full'>
                                    <button className='w-full px-4 py-2 hover:bg-primary-hover hover:text-white flex items-center'
                                        onClick={ logout }>
                                        <IoLogOut className='text-md font-normal mr-2'/>Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar
