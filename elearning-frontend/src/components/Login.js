import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/AuthProvider'
import apiClient from '../services/api'

import Toastify from '../core/Toastify'
import InputField from '../core/InputField'
import Button from '../core/Button'
import Divider from '../core/Divider'

const Login = () => {
    const { login, setIsAdmin, loggedIn } = useAuth()
    // const Auth = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedIn) {
            navigate('/dashboard')
        }
    }, [loggedIn])

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.removeItem('user')

        apiClient({
            method: "post",
            url: "/api/login",
            data: {
                email: email,
                password: password
            }
        }).then((response) => {
            localStorage.setItem('user', response.data.token)
            sessionStorage.setItem('isAdmin', response.data.user.profile.is_admin)
            setIsAdmin(response.data.user.profile.is_admin)
            login()
            navigate('/dashboard')
        }).catch(error => {
            Toastify("error", error)
        })
    }
    
    return (
        <>
            <div className="login-card w-1/3 mx-auto">
                <div className="mb-5">
                    <h4 className='title text-center'>ELEARNING PORTAL</h4>
                </div>
                <hr className='mb-5'/>
                <div>
                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="form-group mb-8">
                            <label>User Email</label>
                            <InputField
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                require={ true }
                            />
                        </div>

                        {/* Password */}
                        <div className="form-group mb-8">
                            <label>Password</label>
                            <InputField
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                require={ true }
                            />
                        </div>

                        <div className="form-group mt-4 text-center">
                            <Button
                                text='LOG IN'
                                classes='bg-blue-500 hover:bg-blue-700'
                                style={{width:'200px', minWidth:'200px'}} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
