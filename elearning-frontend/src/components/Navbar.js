import React, { useEffect, useState } from 'react'
import { useAuth } from '../services/AuthProvider'
import { navigation } from '../constants/navigation' 
import NavbarItem from './NavbarItem'

const Navbar = () => {
    const { loggedIn, logout, isAdmin } = useAuth()

    const [adminNav, setAdminNav] = useState(false)

    useEffect(() => {
      if (loggedIn) {
        setAdminNav(isAdmin)
      }
    }, [loggedIn, isAdmin])

    return (
      <nav className="bg-white border-gray-200 md:px-10 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="https://flowbite.com/" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">ELEARNING.PH</span>
          </a>
          <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                {
                    !loggedIn ?
                        navigation.unauthenticated.map((item, index) => {
                            return (
                                <NavbarItem
                                      key={ index }
                                      name={ item.name }
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
                                          path={ item.path }
                                          hasDropDown={ item.hasDropDown }
                                          children={ item.submeu } />
                                    )
                                })
                            }
                            <li>
                                <button onClick={ logout } className="nav-link btn btn-link h-full">Logout</button>
                            </li>
                        </>
                }
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default Navbar
