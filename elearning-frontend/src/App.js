import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './services/AuthProvider'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminRoute } from './components/AdminRoute'

import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Register from './components/Register'
import ProfileSettings from './components/ProfileSettings'

// Action
import Users from './components/admin/Users';
import Categories from './components/admin/Categories'
import CreateWords from './components/admin/CreateWords'

const App = () => {
  return (
    <AuthProvider>
        <Navbar />
        <Routes>
            <Route path='/' element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />

            {/* Authenticated Modules */}
            <Route path='/dashboard' element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path='/settings' element={
                <ProtectedRoute>
                    <ProfileSettings />
                </ProtectedRoute>
            } />

            {/* Admin Modules */}
            <Route path='/admin/users' element={
                <AdminRoute>
                    <Users />
                </AdminRoute>
            } /> 
            <Route path='/admin/categories' element={
                <AdminRoute>
                    <Categories />
                </AdminRoute>
            } /> 
            <Route path='/admin/words' element={
                <AdminRoute>
                    <CreateWords />
                </AdminRoute>
            } /> 
        </Routes>
    </AuthProvider>
  )
}

export default App;