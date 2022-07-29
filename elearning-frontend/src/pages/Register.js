import React, {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/AuthProvider'
import apiClient from '../services/api'

import Toastify from '../core/Toastify'
import InputField from '../core/InputField'
import Button from '../core/Button'
import Divider from '../core/Divider'
import UserAvatar from '../components/UserAvatar'

const Register = (props) => {
    const { login, loggedIn } = useAuth()

    const navigate = useNavigate()

    const avatarRef = useRef(null)
    const [user, setUser] = useState({
        avatar: null,
        firstname: '',
        middlename: '',
        lastname: '',
        sex: '-',
        birthdate: '',
        phone: '',
        address: '',
        email: '',
        username: '',
        password: ''
    })
    
    const saveUser = async (e) => {
        e.preventDefault()
        localStorage.removeItem('user')

        const checkLogin = await apiClient.get('/sanctum/csrf-cookie')
        
        apiClient({
            method: "post",
            url: "/api/register",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                avatar: user.avatar,
                firstname: user.firstname,
                middlename: user.middlename,
                lastname: user.lastname,
                sex: user.sex,
                birthdate: user.birthdate,
                phone: user.phone,
                address: user.address,
                email: user.email,
                username: user.username,
                password: user.password,
            }
        }).then((response) => {
            setUser({
                ...user,
                avatar: null,
                firstname: '',
                middlename: '',
                lastname: '',
                sex: '',
                birthdate: '',
                phone: '',
                address: '',
                email: '',
                username: '',
                password: '',
            })

            localStorage.setItem('user', response.data)
            login()
            navigate('/dashboard')
        }).catch((error) => {
            Toastify("error", error)
        })
    }

    const deleteAvatar = () => {
        avatarRef.current.value = null
        setUser({
            ...user,
            avatar: null,
        })
    }

    return (
        <div className="register-card w-3/5 mx-auto">
            <div className="mb-5">
                <h4 className='title text-center'>REGISTER</h4>
            </div>
            <hr className='mb-5'/>
            <div>
                {/* Form */}
                <form onSubmit={ saveUser } encType="multipart/form-data">
                    <div className='grid grid-cols-4 gap-5'>
                        <div className="col-span-1">
                            {/* Avatar */}
                            <div className="form-group mb-8 avatar-section">
                                <UserAvatar avatar={ user.avatar } /> 
                                <label>Profile Picture</label>
                                <div className='grid grid-cols-5 items-center gap-2'>
                                    <div className='col-span-4'>
                                        <input
                                            type="file"
                                            name="avatar"
                                            ref={ avatarRef }
                                            onChange={e => {
                                                setUser({
                                                    ...user,
                                                    avatar: e.target.files[0],
                                                })
                                            }}
                                            className="appearance-none w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none"
                                            accept="image/*"
                                            multiple={ false } />
                                    </div>
                                    <div>
                                        <a
                                            role="button"
                                            onClick = { deleteAvatar }
                                            className="bg-red-600 hover:bg-red-500 py-1 px-2 text-white">X</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className='grid grid-cols-3 gap-5'>
                                {/* First Name */}
                                <div className="form-group mb-8">
                                    <label>First Name</label>
                                    <InputField
                                        type="text"
                                        name="firstname"
                                        onChange={e => setUser({
                                            ...user,
                                            firstname: e.target.value
                                        })}
                                        value={ user.firstname }
                                        rquire={ true } />
                                </div>
                                {/* Middle Name */}
                                <div className="form-group mb-8">
                                    <label>Middle Name</label>
                                    <InputField
                                        type="text"
                                        name="middlename"
                                        onChange={e => setUser({
                                            ...user,
                                            middlename: e.target.value
                                        })}
                                        value={ user.middlename } />
                                </div>
                                {/* Last Name */}
                                <div className="form-group mb-8">
                                    <label>Last Name</label>
                                    <InputField
                                        type="text"
                                        name="lastname"
                                        onChange={e => setUser({
                                            ...user,
                                            lastname: e.target.value
                                        })}
                                        value={ user.lastname }
                                        rquire={ true } />
                                </div>
                            </div>
                            <div className='grid grid-cols-3 gap-5'>
                                {/* Sex */}
                                <div className="form-group mb-8">
                                    <label>Sex</label>
                                    <select
                                        name='sex'
                                        onChange={e => setUser({
                                            ...user,
                                            sex: e.target.value
                                        })}
                                        value={ user.sex }
                                        className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none">
                                        <option value='-'>-</option>
                                        <option value='M'>Male</option>
                                        <option value='F'>Female</option>
                                    </select>
                                </div>
                                {/* Birthdate */}
                                <div className="form-group mb-8">
                                    <label>Birth Date</label>
                                    <InputField
                                        type="date"
                                        name="birthdate"
                                        onChange={e => setUser({
                                            ...user,
                                            birthdate: e.target.value
                                        })}
                                        value={ user.birthdate }
                                        rquire={ true } />
                                </div>
                            </div>
                            {/* Address */}
                            <div className="form-group mb-8">
                                <label>Address</label>
                                <InputField
                                    type="text"
                                    name="address"
                                    onChange={e => setUser({
                                        ...user,
                                        address: e.target.value
                                    })}
                                    value={ user.address }
                                    rquire={ true } />
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                {/* Email Address */}
                                <div className="form-group mb-8">
                                    <label>User Email</label>
                                    <InputField
                                        type="email"
                                        name="email"
                                        onChange={e => setUser({
                                            ...user,
                                            email: e.target.value
                                        })}
                                        value={ user.email }
                                        rquire={ true } />
                                </div>
                                {/* Phone */}
                                <div className="form-group mb-8">
                                    <label>Contact No</label>
                                    <InputField
                                        type="text"
                                        name="phone"
                                        onChange={e => setUser({
                                            ...user,
                                            phone: e.target.value
                                        })}
                                        value={ user.phone } />
                                </div>
                            </div>
                            {/* Username */}
                            <div className="form-group mb-8">
                                <label>Username</label>
                                <InputField
                                    type="text"
                                    name="username"
                                    onChange={e => setUser({
                                        ...user,
                                        username: e.target.value
                                    })}
                                    value={ user.username }
                                    rquire={ true } />
                            </div>
                            {/* Password */}
                            <div className="form-group mb-8">
                                <label>Password</label>
                                <InputField
                                    type="text"
                                    name="password"
                                    onChange={e => setUser({
                                        ...user,
                                        password: e.target.value
                                    })}
                                    value={ user.password }
                                    rquire={ true } />
                            </div>
                            <div className="form-group text-right mt-4">
                                <Button
                                    text='REGISTER'
                                    classes='bg-blue-500 hover:bg-blue-700'
                                    style={{width:'200px', minWidth:'200px'}} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
