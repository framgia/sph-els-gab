import React from 'react'
import { Link } from 'react-router-dom'

const AuthLayout = ({ currentPage, children}) => {
    return (
        <div className='auth-container bg-primary-base'>
            <div className='card w-2/3 mx-auto rounded-3xl px-20 py-10' style={{ background: '#f5f7fb' }}>
                <nav className="bg-whitex rounded mb-10">
                    <div className="container flex flex-wrap justify-between items-center mx-auto">
                        <a href="https://flowbite.com/" className="flex items-center">
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-primary-base">ELEARNING.PH</span>
                        </a>
                        {
                            currentPage === 'login' ?
                                <Link to='/register' className='py-2 px-4 border border-gray-300 text-gray-300 rounded-full hover:bg-primary-hover hover:text-white'>Register</Link>
                            :
                                <Link to='/' className='py-2 px-4 border border-gray-300 text-gray-300 rounded-full hover:bg-primary-hover hover:text-white'>Login</Link>
                        }
                    </div>
                </nav>
                { children }
            </div>
        </div>
    )
}

export default AuthLayout
