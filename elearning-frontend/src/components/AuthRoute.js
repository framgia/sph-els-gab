import { Navigate } from 'react-router-dom'
import { useAuth } from '../services/AuthProvider'
import AuthLayout from './layouts/AuthLayout'

export const AuthRoute = ({ currentPage, children }) => {
    const { loggedIn } = useAuth()

    if (loggedIn) {
        return <Navigate to='/dashboard' />
    }

    return (
        <AuthLayout currentPage={currentPage}>
            { children }
        </AuthLayout>
    )
}
