import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavbarItem = ({name, path, hasDropDown, children = null }) => {
    const [dropDown, setDropdown] = useState(false)

    return (
        hasDropDown ?
            <li className='dropdown'>
                <button
                    id="dropdownmenu"
                    data-dropdown-toggle="dropdown"
                    className="text-center inline-flex items-center h-full"
                    type="button"
                    onClick={() => {
                        setDropdown(!dropDown)
                    }}>{ name }
                    <svg
                        className="w-4 h-4 ml-2"
                        aria-hidden="true"
                        fillRule="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div className={`z-10 ${dropDown ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dropdownitems`}>
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                        {
                            children.map((submenu, index) => {
                                return (
                                    <Link
                                        key={ index }
                                        to={ submenu.path }
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => {
                                          setDropdown(!dropDown)
                                        }}>{ submenu.name }</Link>
                                )
                            })
                        }
                    </ul>
                </div>
            </li>
        :
            <NavLink className="py-2 px-4" to={ path }>{ name }</NavLink>
    )
}

export default NavbarItem