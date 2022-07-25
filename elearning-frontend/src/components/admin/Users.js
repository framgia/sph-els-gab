import React, { useCallback, useEffect, useRef, useState } from 'react'
import apiClient from '../../services/api'

import Toastify from '../../core/Toastify'
import InputField from '../../core/InputField'
import Button from '../../core/Button'
import Divider from '../../core/Divider'


const Users = () => {
    const [changeData, setChangeData] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    // Users
    const [userList, setUserList] = useState([])

    // User profile
    const [hasSelectedUser, setHasSelectedUser] = useState(false)
    const [selectedUser, setSelectedUser] = useState('')
    const [hasAvatar, setHasAvatar] = useState(false)
    const defaultPicture = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg'
    const avatarRef = useRef(null)
    const [user, setUser] = useState({
        id: '',
        profilepic: defaultPicture,
        avatar: null,
        firstname: '',
        middlename: null,
        lastname: '',
        sex: '-',
        birthdate: '',
        phone: null,
        address: '',
    })

    // Fetch User
    const GetUsers = useCallback(async () => {
        const data = await apiClient({
            method: "get",
            url: "/api/admin/users",
        }).then(response => {
            setUserList(response.data.users)
            setChangeData(false)
        }).catch(error => {
            Toastify("error", error)
        })
    }, [changeData])
    
    useEffect(() => {
        GetUsers()
        setIsLoading(false)
    }, [GetUsers, changeData])

    // Save User
    const SaveUser = async (e) => {
        e.preventDefault()

        if(!hasSelectedUser) {
            window.alert('No user selected!')
            return
        }

        apiClient({
            method: "post",
            url: `/api/admin/user/` + selectedUser,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                _method: "patch",
                hasAvatar: hasAvatar,
                profilepic: user.profilepic,
                avatar: user.avatar,
                firstname: user.firstname,
                middlename: user.middlename,
                lastname: user.lastname,
                sex: user.sex,
                birthdate: user.birthdate,
                phone: user.phone,
                address: user.address,
            }
        }).then(response => {
            ClearFields()
            Toastify("success", "Succesfully saved user information")
        }).catch(error => {
            Toastify("error", error)
        })
    }

    const ClearFields = () => {
        DeleteAvatar()

        setHasSelectedUser(false)
        setSelectedUser('')

        setUser({
            ...user, 
            profilepic: defaultPicture,
            avatar: null,
            firstname: '',
            middlename: null,
            lastname: '',
            sex: '-',
            birthdate: '',
            phone: null,
            address: '',
        })
        
        setChangeData(true)
    }

    const DeleteAvatar = () => {
        avatarRef.current.value = null
        setUser({
            ...user,
            avatar: null,
            profilepic: defaultPicture,
        })
        setHasAvatar(false)
    }

    var view_element = ""

    if (isLoading) {
        view_element = <tr><td colSpan={2}>LOADING DATA</td></tr>
    }
    else {
        view_element =
            <>
                {
                    userList.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.profile.firstname + " " + (user.profile.middlename !== null && user.profile.middlename !== "" ? user.profile.middlename + " " : "") + user.profile.lastname}</td>
                                <td>
                                    <div className='flex gap-2'>
                                        <Button
                                            text='EDIT'
                                            type='button'
                                            classes='bg-blue-500 hover:bg-blue-700'
                                            onClick={(e) => {
                                                e.preventDefault()

                                                apiClient({
                                                    method: "get",
                                                    url: "/api/admin/user/" + user.id,
                                                }).then(response => {
                                                    ClearFields()

                                                    setHasSelectedUser(true)
                                                    setSelectedUser(response.data.user.id)
                                                    setUser({
                                                        ...user,
                                                        ...response.data.user.profile,
                                                        profilepic: (response.data.user.profile.avatar !== null && response.data.user.profile.avatar != "" ? 'http://127.0.0.1:8000/uploads/avatar/' + response.data.user.profile.avatar : defaultPicture),
                                                        avatar: (response.data.user.profile.avatar !== null && response.data.user.profile.avatar != "" ? response.data.user.profile.avatar : null),
                                                    })
                                    
                                                    if (response.data.user.profile.avatar !== null && response.data.user.profile.avatar != "") {
                                                        setHasAvatar(true)
                                                    }
                                                }).catch(error => {
                                                    Toastify("error", error)
                                                })
                                        }} />
                                        <Button
                                            text='DELETE'
                                            type='button'
                                            classes='bg-red-500 hover:bg-red-700'
                                            onClick={(e) => {
                                                e.preventDefault()

                                                if (window.confirm('Are you sure you want to delete this user?')) {
                                                    apiClient({
                                                        method: "delete",
                                                        url: "/api/admin/user/" + user.id,
                                                        headers: {
                                                            'Content-Type': 'multipart/form-data'
                                                        }
                                                    }).then(response => {
                                                        Toastify("success", "Succesfully deleted user")
                                                    }).catch(error => {
                                                        Toastify("error", error)
                                                    })
                                                }
                                        }} />
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </>
    }

    return (
        <div className='dashboard py-20 px-10'>
            <div className="mb-5">
                <h4 className='title text-left'>USER MANAGEMENT</h4>
            </div>
            <div className='grid grid-cols-6 gap-5'>
                <div className='col-span-2'>
                    <table className='border-separate [border-spacing:1rem] table-fixed'>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>Actions</td>
                            </tr>
                            { view_element }
                        </tbody>
                    </table>
                </div>
                <div className='col-span-4'>
                    <form onSubmit={ SaveUser } encType='multipart/form-data'>
                        <div className='grid grid-cols-4 gap-5'>
                            <div className="col-span-1">
                                {/* Avatar */}
                                <div className="form-group mb-8 avatar-section">
                                    <img
                                        src={ user.profilepic }
                                        alt="dp"
                                        className='mb-5' />
                                    <label>Avatar</label>
                                    <div className='grid grid-cols-5 items-center gap-2'>
                                        <div className='col-span-4'>
                                            <input
                                                type="file"
                                                name="avatar"
                                                ref={ avatarRef }
                                                onInput={e => {
                                                    setHasAvatar(true)
                                                    setUser({
                                                        ...user,
                                                        avatar: e.target.files[0],
                                                        profilepic: URL.createObjectURL(e.target.files[0])
                                                    })
                                                }}
                                                className="appearance-none w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none avatar"
                                                accept="image/*"
                                                multiple={ false } />
                                        </div>
                                        <div>
                                            <a
                                                role="button"
                                                onClick = { DeleteAvatar }
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
                                            onChange={e => {
                                                setUser({
                                                    ...user,
                                                    firstname: e.target.value
                                                })
                                            }}
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
                                            value={ user.middlename === null ? '' : user.middlename }
                                            require={ true } />
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
                                            require={ true } />
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
                                        classes='bg-blue-500 hover:bg-blue-700'
                                        style={{width:'200px', minWidth:'200px'}} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Users
