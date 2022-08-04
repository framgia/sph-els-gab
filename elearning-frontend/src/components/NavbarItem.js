import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavbarItem = ({name, icon, path, hasDropDown, children = null }) => {
    const [dropDown, setDropdown] = useState(false)

    return (
        hasDropDown ?
            <li className='dropdown'>
                <button
                    id='dropdownmenu'
                    data-dropdown-toggle='dropdown'
                    className={`flex items-center p-3 pl-11 w-full text-md font-normal group hover:bg-primary-hover hover:text-white${dropDown ? ' bg-primary-hover text-white' : ''}`}
                    type='button'
                    onClick={() => {
                        setDropdown(!dropDown)
                    }}>
                        <span className='mr-2'>{ icon }</span>
                        { name }
                    <svg
                        className='w-4 h-4 ml-2'
                        aria-hidden='true'
                        fillRule='none'
                        stroke='white'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                    </svg>
                </button>
                <div className={` ${dropDown ? '' : 'hidden'}`}>
                    <ul className='bg-primary-base' aria-labelledby='dropdownDefault'>
                        {
                            children.map((submenu, index) => {
                                return (
                                    <li key={ index }>
                                        <Link
                                            to={ submenu.path }
                                            className='flex items-center p-3 pl-11 w-full text-md font-normal text-white group hover:bg-primary-hover'
                                            onClick={() => {
                                                setDropdown(!dropDown)
                                            }}>{ submenu.name }</Link>
                                        </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </li>
        :
            <li>
                <NavLink className='flex items-center p-3 pl-11 w-full text-md font-normal group hover:bg-primary-hover hover:text-white' to={ path }>
                    <span className='mr-2'>{ icon }</span>
                    { name }
                </NavLink>
            </li>
    )
}

export default NavbarItem
