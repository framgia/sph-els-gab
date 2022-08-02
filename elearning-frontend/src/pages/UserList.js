import React, { useEffect, useState } from 'react'
import UsersTable from '../components/admin/UsersTable'
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
        <div className='dashboard py-20 px-10'>
            <div className="mb-5">
                <h4 className='title text-left'>LIST OF USERS</h4>
            </div>
            <table className='table-fixed border-separate [border-spacing:0.75rem]'>
                <tbody>
                    { UsersTable(userList) }
                </tbody>
            </table>
        </div>
    )
}

export default UserList
