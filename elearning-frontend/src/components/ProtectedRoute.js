import { Navigate } from 'react-router-dom'
import { useAuth } from '../services/AuthProvider'
import ProtectedLayout from './layouts/ProtectedLayout'

export const ProtectedRoute = ({ children }) => {
    const { loggedIn } = useAuth()

    if (!loggedIn) {
        return <Navigate to='/' />
    }

    return (
        <ProtectedLayout>
            { children }
        </ProtectedLayout>
    )
}
