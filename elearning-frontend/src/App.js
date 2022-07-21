import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Register from './components/Register'
import ProfileSettings from './components/ProfileSettings'

// Action
import RenderReducer from './components/actions/RenderReducer'
import SessionReducer from './components/actions/SessionReducer'
import Users from './components/admin/Users';
import Categories from './components/admin/Categories'
import CreateWords from './components/admin/CreateWords'

const App = () => {

  const [loggedIn, setLoggedIn] = RenderReducer(SessionReducer, sessionStorage.getItem('loggedIn') === 'true' || false)
  const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('adminstate') === 'true' || false)
  // const [isAdmin, setIsAdmin] = useState("false")
  
  const login = () => {
    setLoggedIn({
      type: "login"
    })
  }

  const logout = () => {
    setLoggedIn({
      type: "logout"
    })
  }

  const authLink = loggedIn 
    ? <li><button onClick={ logout } className="nav-link btn btn-link">Logout</button> </li>
    : <>
        <li>
          <NavLink className="py-2 px-4" to="/">LOGIN</NavLink>
        </li>
        <li>
          <NavLink className="py-2 px-4 " to='/register'>REGISTER</NavLink>
        </li>
      </>

  return (
    <>
      <Router>
        <Navbar session={ loggedIn } links={ authLink } admin={ isAdmin } />
        <Routes>
          <Route path='/' element={!loggedIn ? <Login login={ login } setAdmin={ setIsAdmin } /> : <Navigate to='/dashboard' /> } />
          <Route path="/register" element={!loggedIn ? <Register login={ login } /> : <Navigate to='/dashboard' />} />

          {/* Authenticated Modules */}
          <Route path='/dashboard' element={loggedIn ? <Dashboard /> : <Navigate to='/' />} />
          <Route path='/settings' element={loggedIn ? <ProfileSettings /> : <Navigate to='/' />} />

          {/* Admin Modules */}
          <Route path='/admin/users' element={loggedIn && isAdmin ? <Users /> : <Navigate to='/' />} /> 
          <Route path='/admin/categories' element={loggedIn && isAdmin ? <Categories /> : <Navigate to='/' />} /> 
          <Route path='/admin/words' element={loggedIn && isAdmin ? <CreateWords /> : <Navigate to='/' />} /> 
        </Routes>
      </Router>
    </>
  )
}

export default App;