import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Divider from '../../core/Divider'
import { FaShareSquare } from 'react-icons/fa'

const ActivityList = (activities) => (
    useMemo(() => {
        return (
            <ul className='space-y-4'>
                {
                    activities.map((activity, index) => {
                        return (
                            <li key={ index } className='bg-white shadow-md py-4 px-6 rounded-md'>
                                {
                                    activity.type === 'follow' ? (
                                        <>
                                            {
                                                activity.follower_user_id === activity.user ?
                                                    <Link className='text-primary-base hover:text-primary-hover font-bold' to='/dashboard'>You</Link> :
                                                <Link to={ `/users/${activity.follower_user_id}` } className='text-primary-base hover:text-primary-hover font-bold'>
                                                {
                                                    activity.follower.firstname +
                                                    ' ' +
                                                    (activity.follower.middlename !== null && activity.follower.middlename !== '' ? activity.follower.middlename + ' ' : '') +
                                                    activity.follower.lastname
                                                }
                                                </Link>
                                            }
                                            <Divider classes=' my-2' />
                                            Followed&nbsp;
                                            <Link to={ `/users/${activity.followee_user_id}` } className='text-primary-base hover:text-primary-hover'>
                                                {
                                                    activity.followee_user_id === activity.user ? 'you' :
                                                    activity.followee.firstname +
                                                    ' ' +
                                                    (activity.followee.middlename !== null && activity.followee.middlename !== '' ? activity.followee.middlename + ' ' : '') +
                                                    activity.followee.lastname
                                                }
                                            </Link>
                                        </>
                                    )
                                    : activity.type === 'words' ?
                                        <>
                                            {
                                                activity.user_id === activity.user ?
                                                    <Link className='text-primary-base hover:text-primary-hover font-bold' to='/dashboard'>You</Link>
                                                :
                                                    <Link to={ `/users/${activity.user_id}` } className='text-primary-base hover:text-primary-hover font-bold'>
                                                    {
                                                        activity.user_profile.profile.firstname +
                                                        ' ' +
                                                        (activity.user_profile.profile.middlename !== null && activity.user_profile.profile.middlename !== '' ? activity.user_profile.profile.middlename + ' ' : '') +
                                                        activity.user_profile.profile.lastname
                                                    }
                                                    </Link>
                                            }
                                            <Divider classes=' my-2' />
                                            Learned&nbsp;
                                            {
                                                activity.category_info.title
                                            }
                                        </>
                                    :
                                        ''
                                }
                                <div className='flex items-center justify-end mt-2'>
                                    <FaShareSquare className='text-slate-500 hover:text-primary-base hover:cursor-pointer' />
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }, [activities])
)

export default ActivityList
