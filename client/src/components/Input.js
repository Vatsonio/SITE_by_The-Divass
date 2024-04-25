import React from 'react';

const Input = ({ type, name, value, onChange }) => (
    <input type={type} name={name} value={value} onChange={onChange} />
);

export default Input;
