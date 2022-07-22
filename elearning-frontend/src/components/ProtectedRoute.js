import { Navigate } from 'react-router-dom'
import { useAuth } from '../services/AuthProvider'

export const ProtectedRoute = ({ children }) => {
    const { loggedIn } = useAuth()

    if (!loggedIn) {
        return <Navigate to='/' />
    }

    return children
}