import React, { useState, useEffect, useRef } from 'react'
import apiClient from '../services/api'

import Toastify from '../core/Toastify'
import InputField from '../core/InputField'
import Button from '../core/Button'
import Divider from '../core/Divider'
import UserAvatar from './UserAvatar'

const ProfileSettings = () => {
    // User Details
    const [hasAvatar, setHasAvatar] = useState(false)
    const avatarRef = useRef(null)
    const [user, setUser] = useState({
        avatar: null,
        firstname: '',
        middlename: null,
        lastname: '',
        sex: '-',
        birthdate: '',
        phone: null,
        address: ''
    })

    const [loading, setLoading] = useState(true)
    const usertoken = localStorage.getItem('user')

    useEffect(() => {
        apiClient({
            method: 'get',
            url: '/api/user',
        }).then(response => {
            setUser(response.data)
            setHasAvatar(response.data.avatar !== null && response.data.avatar !== '' ? true : false)
            setLoading(false)
        }).catch(error => {
            Toastify('error', error)
        })
    }, [])

    const saveUser = (e) => {
        e.preventDefault()

        apiClient({
            method: 'post',
            url: '/api/user',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                _method: 'patch',
                token: usertoken,
                hasAvatar: hasAvatar,
                avatar: user.avatar,
                firstname: user.firstname,
                middlename: user.middlename,
                lastname: user.lastname,
                sex: user.sex,
                birthdate: user.birthdate,
                phone: user.phone,
                address: user.address
            }
        }).then(response => {
            Toastify('success', 'Succesfully saved user information')
        }).catch(error => {
            Toastify('error', error)
        })
    }

    const deleteAvatar = () => {
        avatarRef.current.value = null
        setUser({
            ...user,
            avatar: null,
        })
        setHasAvatar(false)
    }

    return (
        <div className='px-8 py-5'>
            <div className='mb-5'>
                <h4 className='text-left text-lg font-medium'>ACCOUNT SETTINGS</h4>
            </div>
            <Divider />
            <div>
                {
                    user ?
                    <form onSubmit={saveUser} encType='multipart/form-data'>
                        <div className='grid grid-cols-4 gap-5'>
                            <div className='col-span-1'>
                                {/* Avatar */}
                                <div className='form-group mb-8 avatar-section'>
                                    <div className='mb-4'>
                                        <UserAvatar avatar={ user.avatar } />
                                    </div>
                                    <div className='flex justify-center items-center gap-2'>
                                        <label htmlFor='avatar' className='border-2 border-primary-hover text-primary-hover hover:text-white hover:bg-primary-hover w-25 py-1 px-3 rounded-full font-medium text-center btn'> UPLOAD </label>
                                        <input
                                            type='file'
                                            name='avatar'
                                            id='avatar'
                                            ref={ avatarRef }
                                            onInput={e => {
                                                setUser({
                                                    ...user,
                                                    avatar: e.target.files[0],
                                                    profilepic: URL.createObjectURL(e.target.files[0])
                                                })
                                                setHasAvatar(true)
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
                                        <label className='block mb-1 font-medium text-md'>First Name</label>
                                        <InputField
                                            type='text'
                                            name='firstname'
                                            onChange={e => setUser({
                                                ...user,
                                                firstname: e.target.value
                                            })}
                                            classes=' py-2 px-4 border-b-0'
                                            value={ user.firstname }
                                            require={ true } />
                                    </div>
                                    {/* Middle Name */}
                                    <div className='form-group mb-8'>
                                        <label className='block mb-1 font-medium text-md'>Middle Name</label>
                                        <InputField
                                            type='text'
                                            name='middlename'
                                            onChange={e => setUser({
                                                ...user,
                                                middlename: e.target.value
                                            })}
                                            classes=' py-2 px-4 border-b-0'
                                            value={ user.middlename === null ? '' : user.middlename } />
                                    </div>
                                    {/* Last Name */}
                                    <div className='form-group mb-8'>
                                        <label className='block mb-1 font-medium text-md'>Last Name</label>
                                        <InputField
                                            type='text'
                                            name='lastname'
                                            onChange={e => setUser({
                                                ...user,
                                                lastname: e.target.value
                                            })}
                                            classes=' py-2 px-4 border-b-0'
                                            value={ user.lastname }
                                            require={ true } />
                                    </div>
                                </div>
                                <div className='grid grid-cols-3 gap-5'>
                                    {/* Sex */}
                                    <div className='form-group mb-8'>
                                        <label className='block mb-1 font-medium text-md'>Sex</label>
                                        <select
                                            name='sex'
                                            onChange={e => setUser({
                                                ...user,
                                                sex: e.target.value
                                            })}
                                            value={ user.sex }
                                            className='appearance-none border-b-2 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none border-b-0'>
                                            <option value='-'>-</option>
                                            <option value='M'>Male</option>
                                            <option value='F'>Female</option>
                                        </select>
                                    </div>
                                    {/* Birthdate */}
                                    <div className='form-group mb-8'>
                                        <label className='block mb-1 font-medium text-md'>Birth Date</label>
                                        <InputField
                                            type='date'
                                            name='birthdate'
                                            onChange={e => setUser({
                                                ...user,
                                                birthdate: e.target.value
                                            })}
                                            classes=' py-2 px-4 border-b-0'
                                            value={ user.birthdate }
                                            require={ true }  />
                                    </div>
                                </div>
                                {/* Address */}
                                <div className='form-group mb-8'>
                                    <label className='block mb-1 font-medium text-md'>Address</label>
                                    <InputField
                                        type='text'
                                        name='address'
                                        onChange={e => setUser({
                                            ...user,
                                            address: e.target.value
                                        })}
                                        classes=' py-2 px-4 border-b-0'
                                        value={ user.address }
                                        require={ true } />
                                </div>
                                <div className='grid grid-cols-2 gap-5'>
                                    {/* Phone */}
                                    <div className='form-group mb-8'>
                                        <label className='block mb-1 font-medium text-md'>Contact No</label>
                                        <InputField
                                            type='text'
                                            name='phone'
                                            onChange={e => setUser({
                                                ...user,
                                                phone: e.target.value
                                            })}
                                            classes=' py-2 px-4 border-b-0'
                                            value={ user.phone === null ? '' : user.phone } />
                                    </div>
                                </div>
                                <div className='form-group text-right mt-4'>
                                    <Button
                                        text='Save Information'
                                        classes='bg-primary-base hover:bg-primary-hover py-3 rounded-sm'
                                        style={{width:'200px', minWidth:'200px'}} />
                                </div>
                            </div>
                        </div>
                    </form> :
                    <p>LOADING...</p>
                }
            </div>
        </div>
    )
}

export default ProfileSettings
