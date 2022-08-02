import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserAvatar from '../components/UserAvatar'
import Button from '../core/Button'
import Toastify from '../core/Toastify'
import apiClient from '../services/api'

const UserSinglePage = () => {
    let { id } = useParams()

    const [user, setUser] = useState('')

    useEffect(() => {
        apiClient({
            method: 'get',
            url: `/api/user/${id}`
        }).then(response => {
            setUser(response.data)
        }).catch(error => {
            Toastify('error', error)
        })
    }, [])

    const followUser = (e) => {
        e.preventDefault()

        apiClient({
            method: 'post',
            url: `/api/user/${user.id}/follow`,
        }).then(response => {
            Toastify('success', `You are now a follower of ${user.profile.firstname}`)
        }).catch(error => {
            Toastify("error", error)
        })
    }

    const unfollowUser = (e) => {
        e.preventDefault()

        apiClient({
            method: 'delete',
            url: `/api/user/${user.id}/unfollow`,
        }).then(response => {
            Toastify('success', `You are now a follower of ${user.profile.firstname}`)
        }).catch(error => {
            Toastify("error", error)
        })
    }

    return (
        <div className='flex flex-col items-center justify-center' style={{ height: '200px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            { user ?
                <>
                    <UserAvatar avatar={ user.profile.avatar } />
                    <small className='mb-2'>{ `${user.profile.firstname} ${(user.profile.middlename === '' || user.profile.middlename === null ? '' : user.profile.middlename + ' ')}${user.profile.lastname}` }</small>
                    <div className='flex flex-row items-center gap-2'>
                        <Button
                            text='FOLLOW'
                            type='button'
                            classes='bg-blue-500 hover:bg-blue-700'
                            onClick={e => followUser(e) } />
                        <Button
                            text='UNFOLLOW'
                            type='button'
                            classes='bg-red-500 hover:bg-red-700'
                            onClick={e => unfollowUser(e) } />
                    </div>
                </> :
                <p>LOADING...</p>
            }
        </div>
    )
}

export default UserSinglePage
