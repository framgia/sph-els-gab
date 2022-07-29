import { Navigate } from 'react-router-dom'
import { useAuth } from '../services/AuthProvider'

export const AuthRoute = ({ children }) => {
    const { loggedIn } = useAuth()

    if (loggedIn) {
        return <Navigate to='/dashboard' />
    }

    return children
}
