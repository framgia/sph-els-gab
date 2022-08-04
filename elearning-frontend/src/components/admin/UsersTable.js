import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../core/Button'
import Toastify from '../../core/Toastify'
import apiClient from '../../services/api'

const UsersTable = (userList, fillUser = null) => {
    const DeleteUser = (e, userId) => {
        e.preventDefault()

        if (window.confirm('Are you sure you want to delete this user?')) {
            apiClient({
                method: 'delete',
                url: `/api/admin/user/${userId}`,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                Toastify('success', 'Succesfully deleted user')
            }).catch(error => {
                Toastify('error', error)
            })
        }
    }

    return (
        <table className='table-fixed'>
            <tbody>
                {
                    useMemo(() => {
                        return (
                            userList.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        {
                                            fillUser === null ?
                                                <td>
                                                    <Link to={`/users/${user.id}`} className='py-2 px-4 block'>
                                                        <span>
                                                            { `${user.profile.firstname}  ${(user.profile.middlename !== null && user.profile.middlename !== '' ? user.profile.middlename + ' ' : '')}${user.profile.lastname}` }
                                                        </span>
                                                    </Link>
                                                </td>
                                            :
                                                <>
                                                    <td className='py-2 px-4'>{ `${user.profile.firstname}  ${(user.profile.middlename !== null && user.profile.middlename !== '' ? user.profile.middlename + ' ' : '')}${user.profile.lastname}` }</td>
                                                    <td className='py-2 px-4'>                                    
                                                        <div className='flex gap-2'>
                                                            <Button
                                                                text='EDIT'
                                                                type='button'
                                                                classes='bg-primary-base hover:bg-primary-hover'
                                                                onClick={e => fillUser(e, user.id) } />
                                                            <Button
                                                                text='DELETE'
                                                                type='button'
                                                                classes='bg-red-500 hover:bg-red-700'
                                                                onClick={e => DeleteUser(e, user.id) } />
                                                        </div>
                                                    </td>
                                                </>
                                        }
                                    </tr>
                                )
                            })
                        )
                    }, [userList])
                }
            </tbody>
        </table>
    )
}

export default UsersTable
