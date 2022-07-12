import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'

// import ViewUser from './pages/ViewUser';
// import EditUser from './pages/EditUser';

import apiClient from './services/api';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Register from './components/Register';

const App = () => {

  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem('loggedIn') === 'true' || false
  );

  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true);
  };

  const logout = () => {
    const user = localStorage.getItem('user');

    apiClient({
      method: 'post',
      url: '/api/logout',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        accept: 'application/json',
        Authorization: 'Bearer ' + user
      }
    }).then(response => {
      if (response.data.status === undefined) {
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', false);
        sessionStorage.removeItem('user');
        window.location.reload(false);
      }
    });
  }

  const authLink = loggedIn 
    ? <li><button onClick={logout} className="nav-link btn btn-link">Logout</button> </li>
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
        <Navbar session={loggedIn} links={authLink} />
        <Routes>
          <Route path='/' element={ <Login login={login} session={loggedIn} /> } />
          <Route path="/register" element={<Register login={login} session={loggedIn} />} />

          <Route path='/dashboard' element={<Dashboard session={loggedIn} />} />
          {/* <Route path="/view-all" element={<ViewUser session={loggedIn} />} /> */}


          {/* path="/edit-user/:id" */}
          {/* <Route path="/edit-user" component={<EditUser />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
