import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'
import apiClient from './services/api'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Register from './components/Register'
import ProfileSettings from './components/ProfileSettings'

// Action
//import SessionInstance from './components/actions/SessionInstance'
import RenderReducer from './components/actions/RenderReducer'
import SessionReducer from './components/actions/SessionReducer'

const App = () => {

  const [loggedIn, setLoggedIn] = RenderReducer(SessionReducer, sessionStorage.getItem('loggedIn') === 'true' || false)

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
        <Navbar session={ loggedIn } links={ authLink } />
        <Routes>
          <Route path='/' element={ <Login login={ login } session={ loggedIn } /> } />
          <Route path="/register" element={<Register session={ loggedIn } />} />

          <Route path='/dashboard' element={<Dashboard session={ loggedIn } />} />
          <Route path='/settings' element={<ProfileSettings session={ loggedIn } />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
