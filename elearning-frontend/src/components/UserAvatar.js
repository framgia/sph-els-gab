import React from 'react'

const UserAvatar = ({avatar, classes, setWidth = '100%', setHeight = 'auto'}) => {
    const defaultPicture = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg'

    return (
        <div className='p-0.5 rounded-full overflow-hidden border-2 border-green-400 mx-auto'
            style={{ width: `${setWidth}`, height: `${setHeight}`, maxWidth: '200px' }}>
            <img
                src={ (avatar && avatar !== null && avatar !== '') ? (avatar instanceof Blob ? URL.createObjectURL(avatar) : avatar) : defaultPicture }
                alt='dp'
                className={`rounded-full ${classes}`} />
        </div>
    )
}

export default UserAvatar
