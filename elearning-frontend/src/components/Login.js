import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');

        apiClient.get('/sanctum/csrf-cookie').then(response => {
            apiClient({
                method: "post",
                url: "http://127.0.0.1:8000/api/login",
                headers: {
                    'X-CSRFToken': Cookies.get('csrftoken')
                },
                data: {
                    email: email,
                    password: password
                }
            }).then((response) => {
                localStorage.setItem('user', response.data.token)
                props.login();
                navigate('/dashboard')
            }).catch(error => {
                console.log(error);
            });
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (props.session) {
            navigate('/dashboard')
        }
    }, [navigate, props.session])
    
    return (
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
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none" 
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="form-group mb-8">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none" 
                            required
                        />
                    </div>

                    <div className="form-group mt-4 text-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{minWidth:'200px'}}>LOG IN </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;