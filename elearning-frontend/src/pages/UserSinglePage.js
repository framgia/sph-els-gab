import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import ActivityList from '../components/admin/ActivityList'
import UserAvatar from '../components/UserAvatar'
import Button from '../core/Button'
import Divider from '../core/Divider'
import Toastify from '../core/Toastify'
import apiClient from '../services/api'

const UserSinglePage = () => {
    let { id } = useParams()

    const [user, setUser] = useState('')
    const [activities, setActivities] = useState([])
    const [followCount, setFollowCount] = useState({
        followers: 0,
        followees: 0
    })

    const getActivities = useMemo(() => {
        apiClient({
            method: 'get',
            url: `/api/activities/${id}`
        }).then(response => {
            setActivities(response.data)
        }).catch(error => {
            Toastify('error', error)
        })
    }, [])
    
    const getFollowCount = useMemo(() => {
        apiClient({
            method: 'get',
            url: `/api/user/${id}/followactivity`
        }).then(response => {
            setFollowCount(response.data)
        }).catch(error => {
            Toastify('error', error)
        })
    }, [])

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
        <div className='grid grid-cols-3 w-full' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className='col-span-1 flex flex-col items-center justify-center'>
                {
                    user ?
                        <>
                            <UserAvatar avatar={ user.profile.avatar } />
                            <small className='mb-2 font-bold text-lg'>{ `${user.profile.firstname} ${(user.profile.middlename === '' || user.profile.middlename === null ? '' : user.profile.middlename + ' ')}${user.profile.lastname}` }</small>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='flex flex-col items-center'>
                                    { followCount.followees }
                                    <p className='font-semibold mt-2'>FOLLOWING</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    { followCount.followers }
                                    <p className='font-semibold mt-2'>FOLLOWERS</p>
                                </div>
                            </div>
                            <Divider />
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
                        </>
                    :
                        <p>LOADING...</p>
                }
            </div>
            <div className='col-span-2'>
                <div className='col-span-3 px-5'>
                    <h3 className='font-semibold text-lg'>Activities</h3>
                    <Divider />
                    { ActivityList(activities, id) }
                </div>
            </div>
        </div>
    )
}

export default UserSinglePage
