import { Navigate } from 'react-router-dom'
import { useAuth } from '../services/AuthProvider'

export const AdminRoute = ({ children }) => {
    const { loggedIn, isAdmin } = useAuth()

    if (!loggedIn) {
        return <Navigate to='/' />
    }
    else if (loggedIn && !isAdmin) {
        return <Navigate to='/dashboard' />
    }
    
    return children
}
