import React from 'react'

const Button = ({ text, type = 'submit', onClick, classes, style }) => (
    <button
        type={ type }
        className={ `text-white font-medium py-2 px-4 ${classes}` }
        style={ style }
        onClick={ type !== 'submit' ? onClick : (e) => { return true } } >
        { text }
    </button>
)

export default Button
