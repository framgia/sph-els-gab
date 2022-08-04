import React from 'react'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'

const ProtectedLayout = ({children}) => {
    return (
        <>
            <Sidebar />
            <div className='pl-8'>
                <Topbar />
                { children }
            </div>
        </>
    )
}

export default ProtectedLayout
