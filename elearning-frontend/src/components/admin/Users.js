import React, { useCallback, useEffect, useRef, useState } from 'react'
import apiClient from '../../services/api'

import Toastify from '../../core/Toastify'
import InputField from '../../core/InputField'
import Button from '../../core/Button'
import Divider from '../../core/Divider'
import UserAvatar from '../UserAvatar'
import UsersTable from './UsersTable'


const Users = () => {
    const [changeData, setChangeData] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    // Users
    const [userList, setUserList] = useState([])

    // User profile
    const [hasSelectedUser, setHasSelectedUser] = useState(false)
    const [selectedUser, setSelectedUser] = useState('')
    const [hasAvatar, setHasAvatar] = useState(false)
    const avatarRef = useRef(null)
    const [user, setUser] = useState({
        id: '',
        avatar: null,
        firstname: '',
        middlename: null,
        lastname: '',
        sex: '-',
        birthdate: '',
        phone: null,
        address: '',
    })

    const getUsers = useCallback(async () => {
        const data = await apiClient({
            method: "get",
            url: "/api/admin/users",
        }).then(response => {
            setUserList(response.data)
            setChangeData(false)
        }).catch(error => {
            Toastify("error", error)
        })
    }, [changeData])
    
    useEffect(() => {
        getUsers()
        setIsLoading(false)
    }, [getUsers])

    // Spread user information to fields
    const fillUser = async (e, userId) => {
        e.preventDefault()

        apiClient({
            method: "get",
            url: `/api/admin/user/${userId}`
        }).then(response => {
            clearFields()
            setHasSelectedUser(true)
            setSelectedUser(response.data.id)
            setUser(response.data.profile)
            setHasAvatar(response.data.profile.avatar !== null && response.data.profile.avatar != "" ? true : false)
        }).catch(error => {
            Toastify("error", error)
        })
    }

    const saveUser = async (e) => {
        e.preventDefault()

        if(!hasSelectedUser) {
            window.alert('No user selected!')
            return
        }

        apiClient({
            method: "post",
            url: `/api/admin/user/${selectedUser}`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                _method: "patch",
                hasAvatar: hasAvatar,
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
            clearFields()
            Toastify("success", "Succesfully saved user information")
        }).catch(error => {
            Toastify("error", error)
        })
    }

    const clearFields = () => {
        DeleteAvatar()
        setHasSelectedUser(false)
        setSelectedUser('')
        setUser({
            ...user, 
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
        })
        setHasAvatar(false)
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
                            { UsersTable(userList, fillUser) }
                        </tbody>
                    </table>
                </div>
                <div className='col-span-4'>
                    <form onSubmit={ saveUser } encType='multipart/form-data'>
                        <div className='grid grid-cols-4 gap-5'>
                            <div className="col-span-1">
                                {/* Avatar */}
                                <div className="form-group mb-8 avatar-section">
                                    <UserAvatar avatar={ user.avatar } />
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
