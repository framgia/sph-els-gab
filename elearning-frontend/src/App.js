import React from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
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
import { ToastContainer } from 'react-toastify'
import CreateWords from './components/admin/CreateWords'

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
          <Route path="/register" element={<Register login={ login } session={ loggedIn } />} />

          {/* Authenticated Modules */}
          <Route path='/dashboard' element={<Dashboard session={loggedIn} />} />
          <Route path='/settings' element={<ProfileSettings session={loggedIn} />} />

          {/* Admin Modules */}
          <Route path='/admin/users' element={<Users session={loggedIn} />} /> 
          <Route path='/admin/categories' element={<Categories session={loggedIn} />} /> 
          <Route path='/admin/words' element={<CreateWords session={loggedIn} />} /> 
          
        </Routes>
        <ToastContainer />
      </Router>
    </>
  )
}

export default App;