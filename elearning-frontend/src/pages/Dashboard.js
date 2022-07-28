import React, { useState, useEffect } from 'react'
import apiClient from '../services/api'
import { Link } from 'react-router-dom'
import Toastify from '../core/Toastify'
import UserAvatar from '../components/UserAvatar'

const Dashboard = () => {
    const [user, setUser] = useState({
        avatar: '',
        firstname: '',
        middlename: '',
        lastname: ''
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async() => {
            const data = await apiClient({
                method: "get",
                url: "/api/user"
            }).then(response => {
                setUser({...response.data})
                setLoading(false)
            }).catch(error => {
                Toastify("error", error)
            })
        }

        fetchUser()
    }, [])

    var view_element = "";

    if(loading) {
        view_element = <div className='col-span-5 text-center'><h2>LOADING</h2></div>
    }
    else {
        view_element = 
            <>
                <div className='col-span-1 flex flex-col items-center'>
                    <UserAvatar page='dashboard' avatar={ user.avatar } />
                    <small className='mb-2'>{ `${user.firstname} ${(user.middlename === '' ? '' : user.middlename + ' ')}${user.lastname}` }</small>
                    <Link to='/settings' className='text-white bg-blue-600 px-2 py-1 rounded'>Settings</Link>
                </div>
                <div className='col-span-2 px-5'>
                    <h3>My Activities</h3>
                </div>
                <div className='col-span-2 px-5'>
                    <h3>Other Activities</h3>
                </div>
            </>
    }

    return (
        <div className='dashboard py-20 px-10'>
            <div className="mb-5">
                <h4 className='title text-left'>DASHBOARD</h4>
            </div>
            <div className='grid grid-cols-5 gap-5'>
                { view_element }
            </div>
        </div>
    )
}

export default Dashboard
