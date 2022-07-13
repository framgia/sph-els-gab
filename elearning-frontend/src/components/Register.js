import React, {useState, useEffect, useRef} from 'react';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {

    const navigate = useNavigate();

    const [profilepic, setProfilepic] = useState('https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg');
    const [avatar, setAvatar] = useState(null);
    const avatarRef = useRef(null);
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [sex, setSex] = useState('-');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const usertoken = localStorage.getItem('user');

    useEffect(() => {
        if (props.session) {
            navigate('/dashboard')
        }
    }, [navigate, props.session])
    
    const saveUser = async (e) => {
        e.preventDefault();
        localStorage.removeItem('user');

        await apiClient.get('/sanctum/csrf-cookie').then((response) => {
            apiClient({
                method: "post",
                url: "/api/register",
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    profilepic: profilepic,
                    avatar: avatar,
                    firstname: firstname,
                    middlename: middlename,
                    lastname: lastname,
                    sex: sex,
                    birthdate: birthdate,
                    phone: phone,
                    address: address,
                    email: email,
                    username: username,
                    password: password,
                }
            }).then((response) => {
                setProfilepic('https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg');
                setAvatar(null);
                setFirstname('');
                setMiddlename('');
                setLastname('');
                setSex('-');
                setBirthdate('');
                setPhone('');
                setAddress('');
                setEmail('');
                setUsername('');
                setPassword('');

                localStorage.setItem('user', response.data.token);
                props.login();
                navigate('/dashboard');
            }).catch((error) => {
                console.log(error);
            });
        });
    }

    const deleteAvatar = () => {
        avatarRef.current.value = null;
        setAvatar(null);
        setProfilepic('https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg')
    }

    return (
        <div className="register-card w-3/5 mx-auto">
            <div className="mb-5">
                <h4 className='title text-center'>REGISTER</h4>
            </div>
            <hr className='mb-5'/>
            <div>
                {/* Form */}
                <form onSubmit={saveUser} encType="multipart/form-data">
                    <div className='grid grid-cols-4 gap-5'>
                        <div className="col-span-1">
                            {/* Avatar */}
                            <div className="form-group mb-8 avatar-section">
                                <img src={profilepic} alt="dp" className='mb-5' />
                                <label>Profile Picture</label>
                                <div className='grid grid-cols-5 items-center gap-2'>
                                    <div className='col-span-4'>
                                        <input
                                            type="file"
                                            name="avatar"
                                            ref={ avatarRef }
                                            onChange={e => {
                                                setAvatar(e.target.files[0])
                                                setProfilepic(URL.createObjectURL(e.target.files[0]))
                                            }}
                                            className="appearance-none w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none"
                                            accept="image/*"
                                            multiple={ false } />
                                    </div>
                                    <div>
                                        <a
                                            role="button"
                                            onClick = { deleteAvatar }
                                            className="bg-red-600 hover:bg-red-500 py-1 px-2 text-white">X</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className='grid grid-cols-3 gap-5'>
                                {/* First Name */}
                                <div className="form-group mb-8">
                                    <label>First Name</label>
                                    <input type="text" name="firstname" onChange={e => setFirstname(e.target.value)} value={firstname} className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none" />
                                </div>
                                {/* Middle Name */}
                                <div className="form-group mb-8">
                                    <label>Middle Name</label>
                                    <input type="text" name="middlename" onChange={e => setMiddlename(e.target.value)} value={middlename} className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none" />
                                </div>
                                {/* Last Name */}
                                <div className="form-group mb-8">
                                    <label>Last Name</label>
                                    <input type="text" name="lastname" onChange={e => setLastname(e.target.value)} value={lastname} className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none" />
                                </div>
                            </div>
                            <div className='grid grid-cols-3 gap-5'>
                                {/* Sex */}
                                <div className="form-group mb-8">
                                    <label>Sex</label>
                                    <select name='sex' onChange={e => setSex(e.target.value)} value={sex} className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none" >
                                        <option value='-'>-</option>
                                        <option value='M'>Male</option>
                                        <option value='F'>Female</option>
                                    </select>
                                </div>
                                {/* Birthdate */}
                                <div className="form-group mb-8">
                                    <label>Birth Date</label>
                                    <input type="date" name="birthdate" onChange={e => setBirthdate(e.target.value)} value={birthdate}  className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none" />
                                </div>
                            </div>
                            {/* Address */}
                            <div className="form-group mb-8">
                                <label>Address</label>
                                <input type="text" name="address" onChange={e => setAddress(e.target.value)} value={address}  className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none" />
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                {/* Email Address */}
                                <div className="form-group mb-8">
                                    <label>User Email</label>
                                    <input type="email" name="email" onChange={e => setEmail(e.target.value)} value={email}  className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none" />
                                </div>
                                {/* Phone */}
                                <div className="form-group mb-8">
                                    <label>Contact No</label>
                                    <input type="text" name="phone" onChange={e => setPhone(e.target.value)} value={phone}  className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none" />
                                </div>
                            </div>
                            {/* Username */}
                            <div className="form-group mb-8">
                                <label>Username</label>
                                <input type="text" name="username" onChange={e => setUsername(e.target.value)} value={username}  className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none" />
                            </div>
                            {/* Password */}
                            <div className="form-group mb-8">
                                <label>Password</label>
                                <input type="text" name="password" onChange={e => setPassword(e.target.value)} value={password}  className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none" />
                            </div>
                            <div className="form-group text-right mt-4">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{minWidth:'200px'}}>CREATE ACCOUNT</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;