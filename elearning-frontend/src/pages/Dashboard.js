import React, { useState, useMemo } from 'react'
import apiClient from '../services/api'
import Toastify from '../core/Toastify'
import ActivityList from '../components/admin/ActivityList'
import Divider from '../core/Divider'
import DatePicker from 'sassy-datepicker'

const Dashboard = () => {
    const [activities, setActivities] = useState([])

    const getActivities = useMemo(() => {
        apiClient({
            method: 'get',
            url: '/api/activities'
        }).then(response => {
            setActivities(response.data)
        }).catch(error => {
            Toastify('error', error)
        })
    }, [])

    return (
        <div id='dashboard' className='grid grid-cols-8 gap-5 px-8 py-5'>
            <div className='col-span-2 flex flex-col items-center'>
                <div className='w-full mb-5'>
                    <h4 className='text-lg font-medium mb-2'>Activity Calendar</h4>
                    <Divider />
                    <DatePicker />
                </div>
                <div className='w-full'>
                    <h4 className='text-lg font-medium mb-2'>To do List</h4>
                    <Divider />
                </div>
            </div>
            <div className='col-span-2 px-5 border-r border-l border-slate-500'>
                <div className='w-full'>
                    <h3 className='font-medium text-lg'>News Feed</h3>
                    <Divider />
                    { ActivityList(activities) }
                </div>
            </div>
            <div className='col-span-4 px-5'>
                <div className='grid grid-cols-2'>
                    <div className='p-2'>
                        <h3 className='font-medium text-lg'>Courses</h3>
                        <Divider />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
