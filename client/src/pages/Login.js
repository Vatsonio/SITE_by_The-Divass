import React, { useState } from 'react';
import Form from './Form';
import Input from './Input';
import Button from './Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic here
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit">Логін</Button>
        </Form>
    );
};

export default Login;
