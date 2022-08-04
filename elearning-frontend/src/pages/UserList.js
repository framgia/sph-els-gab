import React, { useEffect, useState } from 'react'
import UsersTable from '../components/admin/UsersTable'
import Topbar from '../components/Topbar'
import Divider from '../core/Divider'
import Toastify from '../core/Toastify'
import apiClient from '../services/api'

const UserList = () => {
    const [userList, setUserList] = useState([])

    useEffect(() => {
        apiClient({
            method: "get",
            url: "/api/admin/users",
        }).then(response => {
            setUserList(response.data)
        }).catch(error => {
            Toastify("error", error)
        })
    }, [])

    return (
        <div className='px-8 py-5'>
            <h4 className='text-left text-lg font-medium'>LIST OF USERS</h4>
            <Divider />
            { UsersTable(userList) }
        </div>
    )
}

export default UserList
