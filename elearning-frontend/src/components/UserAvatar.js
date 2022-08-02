import React from 'react'

const UserAvatar = ({avatar}) => {
    const defaultPicture = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg'

    return (
        <img
            src={ (avatar && avatar !== null && avatar !== '') ? (avatar instanceof Blob ? URL.createObjectURL(avatar) : avatar) : defaultPicture }
            alt='dp'
            className='mb-5 h-full'
            style={{ maxHeight: '200px' }} />
    )
}

export default UserAvatar
