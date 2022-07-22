import React from "react"

const InputField = ({ value, name, type, onChange, classes, require = false }) => (
    <input
        type={type}
        value={value}
        name={name}
        className={`appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none ${classes}`}
        onChange={onChange}
        required={require}
    />
)

export default InputField
