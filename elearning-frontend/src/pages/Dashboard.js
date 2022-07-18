import React, { useState, useEffect } from 'react'
import apiClient from '../services/api'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = (props) => {
    const navigate = useNavigate()

    // User Details
    const defaultUserPic = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg'
    const [user, setUser] = useState({
        profilepic: defaultUserPic,
        firstname: '',
        middlename: '',
        lastname: ''
    })

    const [loading, setLoading] = useState(true)
    const usertoken = localStorage.getItem('user')

    useEffect(() => {
        if (!props.session) {
            navigate('/')
        }
        else {
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
                setUser({
                    profilepic: (response.data.user.profile.avatar !== null && response.data.user.profile.avatar != "") ? 'http://127.0.0.1:8000/uploads/avatar/' + response.data.user.profile.avatar : defaultUserPic,
                    firstname: response.data.user.profile.firstname,
                    middlename: response.data.user.profile.middlename,
                    lastname: response.data.user.profile.lastname
                })

                setLoading(false)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [])

    var view_element = "";

    if(loading) {
        view_element = <div className='col-span-5 text-center'><h2>LOADING</h2></div>
    }
    else {
        view_element = 
            <>
                <div className='col-span-1 flex flex-col items-center'>
                    <img
                        src={ user.profilepic }
                        alt="dp"
                        className='mb-5 avatar' />
                    <small className='mb-2'>{ user.firstname + " " + (user.middlename == "" ? "" : user.middlename + " ") + user.lastname }</small>
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
        <>
            <div className='dashboard py-20 px-10'>
                <div className="mb-5">
                    <h4 className='title text-left'>DASHBOARD</h4>
                </div>
                <div className='grid grid-cols-5 gap-5'>
                    { view_element }
                </div>
            </div>
        </>
    )

}

export default Dashboard
