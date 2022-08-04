import React, {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/AuthProvider'
import apiClient from '../services/api'

import Toastify from '../core/Toastify'
import InputField from '../core/InputField'
import Button from '../core/Button'
import Divider from '../core/Divider'
import UserAvatar from '../components/UserAvatar'

const Register = () => {
    const { login } = useAuth()

    const navigate = useNavigate()

    const avatarRef = useRef(null)
    const [user, setUser] = useState({
        avatar: null,
        firstname: {
            value: '',
            active: false
        },
        middlename: {
            value: '',
            active: false
        },
        lastname: {
            value: '',
            active: false
        },
        sex: {
            value: '-',
            active: false
        },
        birthdate: {
            value: '',
            active: false
        },
        phone: {
            value: '',
            active: false
        },
        address: {
            value: '',
            active: false
        },
        email: {
            value: '',
            active: false
        },
        username: {
            value: '',
            active: false
        },
        password: {
            value: '',
            active: false
        },
    })
    
    const saveUser = async (e) => {
        e.preventDefault()
        localStorage.removeItem('user')

        const checkLogin = await apiClient.get('/sanctum/csrf-cookie')
        
        apiClient({
            method: 'post',
            url: '/api/register',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                avatar: user.avatar,
                firstname: user.firstname.value,
                middlename: user.middlename.value,
                lastname: user.lastname.value,
                sex: user.sex.value,
                birthdate: user.birthdate.value,
                phone: user.phone.value,
                address: user.address.value,
                email: user.email.value,
                username: user.username.value,
                password: user.password.value,
            }
        }).then((response) => {
            setUser({
                ...user,
                avatar: null,
                firstname: {
                    value: '',
                    active: false
                },
                middlename: {
                    value: '',
                    active: false
                },
                lastname: {
                    value: '',
                    active: false
                },
                sex: {
                    value: '-',
                    active: false
                },
                birthdate: {
                    value: '',
                    active: false
                },
                phone: {
                    value: '',
                    active: false
                },
                address: {
                    value: '',
                    active: false
                },
                email: {
                    value: '',
                    active: false
                },
                username: {
                    value: '',
                    active: false
                },
                password: {
                    value: '',
                    active: false
                },
            })

            localStorage.setItem('user', response.data)
            login()
            navigate('/dashboard')
        }).catch((error) => {
            Toastify('error', error)
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
        <>
            {/* Form */}
            <form id='register-form' onSubmit={ saveUser } encType='multipart/form-data'>
                <h3 className='font-bold text-lg text-center'>Start your journey</h3>
                <Divider />
                <div className='grid grid-cols-4 gap-5'>
                    <div className='col-span-1'>
                        {/* Avatar */}
                        <div className='form-group mb-8 avatar-section'>
                            <div className='mb-4'>
                                <UserAvatar avatar={ user.avatar } />
                            </div>
                            <div className='flex justify-center items-center gap-2'>
                                <label htmlFor='avatar' className='border-2 border-primary-hover text-primary-hover hover:text-white hover:bg-primary-hover w-25 py-1 px-3 rounded-full font-medium text-center btn'>UPLOAD</label>
                                <input
                                    type='file'
                                    name='avatar'
                                    ref={ avatarRef }
                                    onChange={e => {
                                        setUser({
                                            ...user,
                                            avatar: e.target.files[0],
                                        })
                                    }}
                                    className='hidden'
                                    accept='image/*'
                                    multiple={ false } />
                                <button
                                    type='button'
                                    onClick = { deleteAvatar }
                                    className='bg-red-500 hover:bg-red-700 py-1 px-2 text-white rounded-full font-medium'>X</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <div className='grid grid-cols-3 gap-5'>
                            {/* First Name */}
                            <div className='form-group mb-8'>
                                <label className='font-semibold'>First Name</label>
                                <InputField
                                    type='text'
                                    name='firstname'
                                    onChange={e => setUser({
                                        ...user,
                                        firstname: {
                                            value: e.target.value,
                                            active: e.target.value.length > 0 ? true : false
                                    }})}
                                    value={ user.firstname.value }
                                    rquire={ true } />
                                <div className={`validator${user.firstname.active ? ' active' : ''}`} />
                            </div>
                            {/* Middle Name */}
                            <div className='form-group mb-8'>
                                <label className='font-semibold'>Middle Name</label>
                                <InputField
                                    type='text'
                                    name='middlename'
                                    onChange={e => setUser({
                                        ...user,
                                        middlename: {
                                            value: e.target.value,
                                            active: e.target.value.length > 0 ? true : false
                                    }})}
                                    value={ user.middlename.value } />
                                <div className={`validator${user.middlename.active ? ' active' : ''}`} />
                            </div>
                            {/* Last Name */}
                            <div className='form-group mb-8'>
                                <label className='font-semibold'>Last Name</label>
                                <InputField
                                    type='text'
                                    name='lastname'
                                    onChange={e => setUser({
                                        ...user,
                                        lastname: {
                                            value: e.target.value,
                                            active: e.target.value.length > 0 ? true : false
                                    }})}
                                    value={ user.lastname.value }
                                    rquire={ true } />
                                <div className={`validator${user.lastname.active ? ' active' : ''}`} />
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-5'>
                            {/* Sex */}
                            <div className='form-group mb-8'>
                                <label className='font-semibold'>Sex</label>
                                <select
                                    name='sex'
                                    onChange={e => setUser({
                                        ...user,
                                        sex: {
                                            value: e.target.value,
                                            active: e.target.value === 'M' || e.target.value === 'F' ? true : false
                                    }})}
                                    value={ user.sex.value }
                                    className='appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none'>
                                    <option value='-'>-</option>
                                    <option value='M'>Male</option>
                                    <option value='F'>Female</option>
                                </select>
                                <div className={`validator${user.sex.active ? ' active' : ''}`} />
                            </div>
                            {/* Birthdate */}
                            <div className='form-group mb-8'>
                                <label className='font-semibold'>Birth Date</label>
                                <InputField
                                    type='date'
                                    name='birthdate'
                                    onChange={e => setUser({
                                        ...user,
                                        birthdate: {
                                            value: e.target.value,
                                            active: e.target.value.length > 0 ? true : false
                                    }})}
                                    rquire={ true } />
                                <div className={`validator${user.birthdate.active ? ' active' : ''}`} />
                            </div>
                        </div>
                        {/* Address */}
                        <div className='form-group mb-8'>
                            <label className='font-semibold'>Address</label>
                            <InputField
                                type='text'
                                name='address'
                                onChange={e => setUser({
                                    ...user,
                                    address: {
                                        value: e.target.value,
                                        active: e.target.value.length > 0 ? true : false
                                }})}
                                value={ user.address.value }
                                rquire={ true } />
                            <div className={`validator${user.address.active ? ' active' : ''}`} />
                        </div>
                        <div className='grid grid-cols-2 gap-5'>
                            {/* Email Address */}
                            <div className='form-group mb-8'>
                                <label className='font-semibold'>User Email</label>
                                <InputField
                                    type='email'
                                    name='email'
                                    onChange={e => setUser({
                                        ...user,
                                        email: {
                                            value: e.target.value,
                                            active: e.target.value.length > 0 ? true : false
                                    }})}
                                    value={ user.email.value }
                                    rquire={ true } />
                                <div className={`validator${user.email.active ? ' active' : ''}`} />
                            </div>
                            {/* Phone */}
                            <div className='form-group mb-8'>
                                <label className='font-semibold'>Contact No</label>
                                <InputField
                                    type='text'
                                    name='phone'
                                    onChange={e => setUser({
                                        ...user,
                                        phone: {
                                            value: e.target.value,
                                            active: e.target.value.length > 0 ? true : false
                                    }})}
                                    value={ user.phone.value } />
                                <div className={`validator${user.phone.active ? ' active' : ''}`} />
                            </div>
                        </div>
                        {/* Username */}
                        <div className='form-group mb-8'>
                            <label className='font-semibold'>Username</label>
                            <InputField
                                type='text'
                                name='username'
                                onChange={e => setUser({
                                    ...user,
                                    username: {
                                        value: e.target.value,
                                        active: e.target.value.length > 0 ? true : false
                                }})}
                                value={ user.username.value }
                                rquire={ true } />
                            <div className={`validator${user.username.active ? ' active' : ''}`} />
                        </div>
                        {/* Password */}
                        <div className='form-group mb-8'>
                            <label className='font-semibold'>Password</label>
                            <InputField
                                type='text'
                                name='password'
                                onChange={e => setUser({
                                    ...user,
                                    password: {
                                        value: e.target.value,
                                        active: e.target.value.length > 0 ? true : false
                                }})}
                                value={ user.password.value }
                                rquire={ true } />
                                <div className={`validator${user.password.active ? ' active' : ''}`} />
                        </div>
                        <div className='form-group text-right mt-4'>
                            <Button
                                text='REGISTER'
                                classes='bg-primary-base hover:bg-primary-hover rounded-full'
                                style={{width:'120px'}} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Register
