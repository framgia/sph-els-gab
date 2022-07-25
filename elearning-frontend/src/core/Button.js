import React from 'react'

const Button = ({ text, type = 'submit', onClick, classes, style }) => {
    if(type === 'submit')
    {
        return <button
                type={ type }
                className={ `text-white font-bold py-2 px-4 rounded ${classes}` }
                style={ style }
                 >
                { text }
            </button>
        
    }
    else {
        return <button
                type={ type }
                className={ `text-white font-bold py-2 px-4 rounded ${classes}` }
                style={ style }
                onClick={ onClick } >
                { text }
            </button>
    }
}

export default Button
