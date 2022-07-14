import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/api';

const Users = (props) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [changeData, setChangeData] = useState(true);

    // Users
    const [users, setUsers] = useState([]);
    const usertoken = localStorage.getItem('user');

    // User Profile
    const [hasUser, setHasUser] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [profilepic, setProfilepic] = useState('https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg');
    const [hasAvatar, setHasAvatar] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const avatarRef = useRef(null);
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [sex, setSex] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    const [profileLoading, setProfileLoading] = useState(true);

    // Fetch all users
    const fetchUsers = useCallback(async () => {
        if (changeData) {
            const data = await apiClient({
                method: "post",
                url: "/api/admin/all-users",
                headers: {
                    Authorization: 'Bearer ' + usertoken
                },
                data: {
                    token: usertoken
                }
                }).then(response => {
                    setUsers(response.data.users)
                }).catch(error => {
                    console.log(error);
            });
        }
    }, [changeData])

    // Component mount
    useEffect(() => {
        if (!props.session) {
            navigate('/')
        }
        else {
            apiClient({
                method: "post",
                url: "/api/user",
                headers: {
                    Authorization: 'Bearer ' + usertoken
                },
                data: {
                  token: usertoken
                }
              }).then(response => { 
                if (!!response.data.user.profile.is_admin) {
                    fetchUsers().catch(error => {
                        console.log(error);
                    });

                    setChangeData(false);
                    setLoading(false);
                }
                else {
                    navigate('/dashboard')
                }
              }).catch(error => {
                console.log(error);
            });
        }
    }, [props.session, fetchUsers]);

    // Load user profile
    // const loadProfile = (param) => {
    //     apiClient({

    //     })
    // }

    // Save User
    const saveUser = (e) => {
        e.preventDefault();

        if (!hasUser) {
            window.alert('No user selected');
            return;
        }

        apiClient({
            method: "post",
            url: "/api/admin/update-user",
            headers: {
                Authorization: 'Bearer ' + usertoken,
                'Content-Type': 'multipart/form-data'
            },
            data: {
                user: currentUser,
                profilepic: profilepic,
                hasAvatar: hasAvatar,
                avatar: avatar,
                firstname: firstname,
                middlename: middlename,
                lastname: lastname,
                sex: sex,
                birthdate: birthdate,
                phone: phone,
                address: address,
                email: email,
            }
        }).then(response => {
            console.log(response.data);

            deleteAvatar();
            setCurrentUser('');
            setFirstname('');
            setMiddlename('');
            setLastname('');
            setSex('-');
            setBirthdate('');
            setPhone('');
            setAddress('');
            setEmail('');

            setChangeData(true);
            setHasUser(false);
        }).catch(error => {
            console.log(error);
        });
    }

    // Delete Avatar
    const deleteAvatar = () => {
        avatarRef.current.value = null;
        setAvatar(null);
        setProfilepic('https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg');
        setHasAvatar(false);
    }

    var view_element = ""

    if (loading) {
        view_element = <tr><td colSpan={2}>"LOADING DATA"</td></tr>
    }
    else {
        view_element =
            users.map((user) => {
                return (
                    <tr key={user.id}>
                        <td>{user.profile.firstname + " " + (user.profile.middlename == "" ? "" : user.profile.middlename + " ") + user.profile.lastname}</td>
                        <td>
                            <div className='flex gap-2'>
                                <button className='bg-green-600 text-white px-2 py-1' onClick={() => {
                                    apiClient({
                                        method: "post",
                                        url: "/api/admin/single-user",
                                        headers: {
                                            Authorization: 'Bearer ' + usertoken
                                        },
                                        data: {
                                            user: user.id
                                        }
                                    }).then(response => {
                                        if (response.data.user.profile.avatar !== null && response.data.user.profile.avatar != "") {
                                            setHasAvatar(true);
                                            setAvatar(response.data.user.profile.avatar);
                                            setProfilepic('http://127.0.0.1:8000/uploads/avatar/' + response.data.user.profile.avatar);
                                        }

                                        setCurrentUser(response.data.user.id);
                                        setFirstname(response.data.user.profile.firstname);
                                        setMiddlename(response.data.user.profile.middlename);
                                        setLastname(response.data.user.profile.lastname);
                                        setSex(response.data.user.profile.sex);
                                        setBirthdate(response.data.user.profile.birthdate);
                                        setPhone(response.data.user.profile.phone);
                                        setAddress(response.data.user.profile.address);
                                        setEmail(response.data.user.email);
                        
                                        setProfileLoading(false);
                                        setHasUser(true);
                                    }).catch(error => {
                                        console.log(error);
                                    })
                                }} >Edit</button>

                                <button className='bg-rose-800 text-white px-2 py-1' onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this user?')) {
                                        apiClient({
                                            method: "post",
                                            url: "/api/admin/delete-user",
                                            headers: {
                                                Authorization: 'Bearer ' + usertoken
                                            },
                                            data: {
                                                user: user.id
                                            }
                                        }).then(response => {
                                            setChangeData(true);
                                        }).catch(error => {
                                            console.log(error);
                                        })
                                    }
                                } }>Delete</button>
                            </div>
                        </td>
                    </tr>
                )
            })
    }

  return (
    <>
        <div className='dashboard py-20 px-10'>
            <div className="mb-5">
                <h4 className='title text-left'>Manage Users</h4>
            </div>
            <div className='grid grid-cols-6'>
                <div className='col-span-2'>
                    <table className='table-fixed border-separate [border-spacing:1rem]'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                            { view_element }
                        </tbody>
                    </table>
                </div>
                <div className='col-span-4'>
                    <form onSubmit={ saveUser } encType="multipart/form-data">
                        <div className='grid grid-cols-4 gap-5'>
                            <div className="col-span-1">
                                {/* Avatar */}
                                <div className="form-group mb-8 avatar-section">
                                    <img
                                        src={ profilepic }
                                        alt="dp"
                                        className='mb-5' />
                                    <label>Avatar</label>
                                    <div className='grid grid-cols-5 items-center gap-2'>
                                        <div className='col-span-4'>
                                            <input
                                                type="file"
                                                name="avatar"
                                                ref={ avatarRef }
                                                onInput={e => {
                                                    setHasAvatar(true);
                                                    setAvatar(e.target.files[0]);
                                                    setProfilepic(URL.createObjectURL(e.target.files[0]));
                                                }}
                                                className="appearance-none w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none avatar"
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
                                            <option value="-">-</option>
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
                                        <p className='input py-1 px-3 text-gray-700 leading-tight'>{ email }</p>
                                    </div>
                                    {/* Phone */}
                                    <div className="form-group mb-8">
                                        <label>Contact No</label>
                                        <input type="text" name="phone" onChange={e => setPhone(e.target.value)} value={phone}  className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none" />
                                    </div>
                                </div>
                                <div className="form-group text-right mt-4">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{minWidth:'200px'}}>Save Information</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Users