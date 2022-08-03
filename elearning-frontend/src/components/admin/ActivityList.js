import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

const ActivityList = (activities, currentUser) => (
    useMemo(() => {
        return (
            <ul className='space-y-2'>
                {
                    activities.map((activity, index) => {
                        return (
                            <li key={ index }>
                                {
                                    activity.type === 'follow' ? (
                                        <>
                                            {
                                                activity.follower_user_id === activity.user ? 
                                                    'You' :
                                                <Link to={ `/users/${activity.follower_user_id}` } className='text-blue-500'>
                                                {
                                                    activity.follower.firstname +
                                                    ' ' +
                                                    (activity.follower.middlename !== null && activity.follower.middlename !== '' ? activity.follower.middlename + ' ' : '') +
                                                    activity.follower.lastname
                                                }
                                                </Link>
                                            }
                                            
                                            &nbsp;followed&nbsp;
                                            {
                                                activity.followee_user_id === activity.user ? 
                                                    'You' :
                                                <Link to={ `/users/${activity.followee_user_id}` } className='text-blue-500'>
                                                    {
                                                        activity.followee_user_id === activity.user ? 'you' :
                                                        activity.followee.firstname +
                                                        ' ' +
                                                        (activity.followee.middlename !== null && activity.followee.middlename !== '' ? activity.followee.middlename + ' ' : '') +
                                                        activity.followee.lastname
                                                    }
                                                </Link>
                                            }
                                        </>
                                    )
                                    : activity.type === 'words' ?
                                        <>
                                            {
                                                activity.user_id === activity.user ?
                                                    'You'
                                                :
                                                    <Link to={ `/users/${activity.user_id}` } className='text-blue-500'>
                                                    {
                                                        activity.user_profile.profile.firstname +
                                                        ' ' +
                                                        (activity.user_profile.profile.middlename !== null && activity.user_profile.profile.middlename !== '' ? activity.user_profile.profile.middlename + ' ' : '') +
                                                        activity.user_profile.profile.lastname
                                                    }
                                                    </Link>
                                            }
                                            &nbsp;learned&nbsp;
                                            {
                                                activity.category_info.title
                                            }
                                        </>
                                    :
                                        ''
                                }
                            </li>
                        )
                    })
                }
            </ul>
        )
    }, [activities])
)

export default ActivityList
