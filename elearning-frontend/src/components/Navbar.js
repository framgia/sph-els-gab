import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../services/api'

const Navbar = (props) => {

  const [dropDown, setDropdown] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (props.session) {
      
      const usertoken = localStorage.getItem('user')

      apiClient({
          method: "post",
          url: "/api/user",
          headers: {
              Authorization: 'Bearer ' + usertoken
          },
          data: {
              token: usertoken
          }
      }).then(response => {
        setIsAdmin(!!response.data.user.profile.is_admin)
      }).catch(error => {
        console.log(error)
      })
    }
  }, [])

  if (props.session)
  {
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
              <li>
                <a href="/" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
              </li>
              { isAdmin ?
                  <>
                    <li className='dropdown'>
                        <button
                            id="dropdownmenu"
                            data-dropdown-toggle="dropdown"
                            className="text-center inline-flex items-center"
                            type="button"
                            onClick={() => {
                              setDropdown(!dropDown)
                            }}>Dropdown button
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
                        <div
                            className={`z-10 ${dropDown ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dropdownitems`}>
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                              <li>
                                <Link to="/admin/users" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">User Management</Link>
                              </li>
                            </ul>
                        </div>
                      </li>
                    </>
                : <></>
              }
              { props.links }
            </ul>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white border-gray-200 px-10 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="https://flowbite.com/" className="flex items-center"></a>
          <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              {props.links}
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
