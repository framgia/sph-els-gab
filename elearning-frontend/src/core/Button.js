import React from 'react'

const Button = ({ text, type = 'submit', onClick, classes, style }) => (
    <button
        type={ type }
        className={ `text-white font-bold py-2 px-4 rounded ${classes}` }
        style={ style }
        onClick={ type !== 'submit' ? onClick : (e) => { return true } } >
        { text }
    </button>
)

export default Button
