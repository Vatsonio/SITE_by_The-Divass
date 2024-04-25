import React, { useState } from 'react';
import Form from './Form';
import Input from './Input';
import Button from './Button';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle registration logic here
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Виберіть роль</option>
                <option value="needy">Нужденний</option>
                <option value="volunteer">Волонтер</option>
            </select>
            <Button type="submit">Зареєструватися</Button>
        </Form>
    );
};

export default Register;
