import { createContext, useContext, useMemo } from 'react'
import { usePersistentStorage } from './persistentStorage'
import RenderReducer from './actions/RenderReducer'
import SessionReducer from './actions/SessionReducer'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = RenderReducer(SessionReducer, sessionStorage.getItem('loggedIn') === 'true' || false)
    const [isAdmin, setIsAdmin] = usePersistentStorage('isAdmin', sessionStorage.getItem('loggedIn') === 'true' || false)

    const login = async () => {
        const data = await setLoggedIn({
          type: "login",
        })
    }
  
    const logout = () => {
        setLoggedIn({
          type: "logout"
        })

        setIsAdmin(false)
    }
  
    const value = useMemo(() => ({
        login,
        logout,
        loggedIn,
        isAdmin,
        setIsAdmin
    }), [loggedIn, isAdmin])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
  
export const useAuth = () => {
    return useContext(AuthContext)
}
