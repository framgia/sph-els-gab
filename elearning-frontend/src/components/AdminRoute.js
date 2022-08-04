import { Navigate } from 'react-router-dom'
import { useAuth } from '../services/AuthProvider'
import ProtectedLayout from './layouts/ProtectedLayout'

export const AdminRoute = ({ children }) => {
    const { loggedIn, isAdmin } = useAuth()

    if (!loggedIn) {
        return <Navigate to='/' />
    }
    else if (loggedIn && !isAdmin) {
        return <Navigate to='/dashboard' />
    }
    
    return (
        <ProtectedLayout>
            { children }
        </ProtectedLayout>
    )
}
