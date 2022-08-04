import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './services/AuthProvider'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminRoute } from './components/AdminRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import ProfileSettings from './components/ProfileSettings'

// Action
import Users from './components/admin/Users';
import Categories from './components/admin/Categories'
import CreateWords from './components/admin/CreateWords'
import EditWords from './components/admin/EditWords'
import { AuthRoute } from './components/AuthRoute'
import { ToastContainer } from 'react-toastify'
import SelectQuiz from './pages/quizzes/SelectQuiz'
import QuizPage from './pages/quizzes/QuizPage'
import UserList from './pages/UserList'
import UserSinglePage from './pages/UserSinglePage'

const App = () => {
  return (
    <AuthProvider>
        <Navbar />
        <Routes>
            <Route path='/' element={
                <AuthRoute>
                    <Login />
                </AuthRoute>
            } />
            <Route path="/register" element={
                <AuthRoute>
                    <Register />
                </AuthRoute>
            } />
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
            <Route path='/users' element={
                <ProtectedRoute>
                    <UserList />
                </ProtectedRoute>
            } />
            <Route path='/users/:id' element={
                <ProtectedRoute>
                    <UserSinglePage />
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
            <Route path='/admin/words/edit' element={
                <AdminRoute>
                    <EditWords />
                </AdminRoute>
            } /> 
            <Route path='/quiz' element={
                <ProtectedRoute>
                    <SelectQuiz />
                </ProtectedRoute>
            } /> 
            <Route path='/quiz/:slug' element={
                <ProtectedRoute>
                    <QuizPage />
                </ProtectedRoute>
            } /> 
        </Routes>
        <ToastContainer />
    </AuthProvider>
  )
}

export default App;
