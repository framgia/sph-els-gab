import React, { useState, useEffect, useRef } from 'react'
import apiClient from '../services/api'

import Toastify from '../core/Toastify'
import InputField from '../core/InputField'
import Button from '../core/Button'
import Divider from '../core/Divider'

const ProfileSettings = () => {
    // User Details
    const [hasAvatar, setHasAvatar] = useState(false)
    const defaultPicture = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg'
    const avatarRef = useRef(null)
    const [user, setUser] = useState({
        profilepic: defaultPicture,
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
            method: "get",
            url: "/api/user",
        }).then(response => {
            setUser({
                ...user,
                ...response.data,
                email: response.data.email,
                profilepic: (response.data.avatar !== null && response.data.avatar !== "" ? 'http://127.0.0.1:8000/uploads/avatar/' + response.data.avatar : defaultPicture),
                avatar: (response.data.avatar !== null && response.data.avatar !== "" ? response.data.avatar : null),
            })

            if (response.data.avatar !== null && response.data.avatar !== "") {
                setHasAvatar(true)
            }

            setLoading(false)
        }).catch( error => {
            Toastify("error", error)
            })
    }, [])

    const saveUser = (e) => {
        e.preventDefault()

        apiClient({
            method: "post",
            url: "/api/user",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                _method: "patch",
                token: usertoken,
                hasAvatar: hasAvatar,
                profilepic: user.profilepic,
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
            Toastify("success", "Succesfully saved user information")
        }).catch(error => {
            Toastify("error", error)
        })
    }

    const deleteAvatar = () => {
        avatarRef.current.value = null
        setUser({
            ...user,
            avatar: null,
            profilepic: 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg'
        })
        setHasAvatar(false)
    }

    var view_element = ""

    if(loading) {
        view_element = <div><h2>LOADING</h2></div>
    }
    else {
        view_element = 
            <>
                <form onSubmit={saveUser} encType="multipart/form-data">
                    <div className='grid grid-cols-4 gap-5'>
                        <div className="col-span-1">
                            {/* Avatar */}
                            <div className="form-group mb-8 avatar-section">
                                <img src={ user.profilepic } alt="dp" className='mb-5' />
                                <label>Profile Picture</label>
                                <div className='grid grid-cols-5 items-center gap-2'>
                                    <div className='col-span-4'>
                                        <input
                                            type="file"
                                            name="avatar"
                                            ref={ avatarRef }
                                            onInput={e => {
                                                setUser({
                                                    ...user,
                                                    avatar: e.target.files[0],
                                                    profilepic: URL.createObjectURL(e.target.files[0])
                                                })
                                                setHasAvatar(true)
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
                                        require={ true } />
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
                                        value={ user.middlename === null ? '' : user.middlename } />
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
                                        require={ true } />
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
                                        require={ true }  />
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
                                    require={ true } />
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
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
                                        value={ user.phone === null ? '' : user.phone } />
                                </div>
                            </div>
                            <div className="form-group text-right mt-4">
                                <Button
                                    text='Save Information'
                                    color='blue'
                                    style={{width:'200px', minWidth:'200px'}} />
                            </div>
                        </div>
                    </div>
                </form>
            </>
    }

    return (
        <>
            <div className="dashboard py-20 px-10">
                <div className="mb-5">
                    <h4 className='title text-left'>ACCOUNT SETTINGS</h4>
                </div>
                <hr className='mb-5'/>
                <div>
                    { view_element }
                </div>
            </div>
        </>
    )
}

export default ProfileSettings
