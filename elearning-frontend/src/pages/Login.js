import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/AuthProvider'
import apiClient from '../services/api'

import Toastify from '../core/Toastify'
import InputField from '../core/InputField'
import Button from '../core/Button'
import Divider from '../core/Divider'
import LoginFormImage from '../assets/images/LoginFormImage.png'

const Login = () => {
    const { login, setIsAdmin, loggedIn } = useAuth()

    const [email, setEmail] = useState({
        value: '',
        active: false
    })
    const [password, setPassword] = useState({
        value: '',
        active: false
    })
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.removeItem('user')

        apiClient({
            method: "post",
            url: "/api/login",
            data: {
                email: email.value,
                password: password.value
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
        <div className='grid grid-cols-2 items-center' style={{ minHeight: '305px' }}>
            <form id='login-form' onSubmit={handleSubmit}>
                <h3 className='font-bold text-lg'>Login to your account</h3>
                <Divider />
                {/* Email */}
                <div className="form-group mb-8">
                    <InputField
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={ email.value }
                        onChange={e => setEmail({
                            ...email,
                            value: e.target.value,
                            active: e.target.value.length > 0 ? true : false
                        })}
                        classes={`pb-2 pt-5 border-b-0${email.active ? ' active' : ''}`}
                        require={ true }
                    />
                    <label htmlFor='email'>EMAIL</label>
                </div>
                {/* Password */}
                <div className="form-group mb-8">
                    <InputField
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={ password.value }
                        onChange={e => setPassword({
                            ...password,
                            value: e.target.value,
                            active: e.target.value.length > 0 ? true : false
                        })}
                        classes={`pb-2 pt-5 border-b-0${password.active ? ' active' : ''}`}
                        require={ true }
                    />
                    <label htmlFor='password'>PASSWORD</label>
                </div>
                <div className="form-group mt-4 text-right">
                    <Button
                        text='LOG IN'
                        classes='bg-primary-base hover:bg-primary-hover rounded-full'
                        style={{width:'120px'}} />
                </div>
            </form>
            <div className='h-full' style={{ backgroundImage: `url(${LoginFormImage})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        </div>
    )
}

export default Login
