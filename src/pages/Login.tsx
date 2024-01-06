import React from 'react';
import { useUser } from '../store/user';
// import {  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const setUser = useUser((state) => state.setUser);

    const navigate = useNavigate();

    const [error, setError] = React.useState<null | String>(null);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('enviando form');
        const data = new FormData(event.currentTarget);
        try {
            setError(null)
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.get('username'),
                    password: data.get('password'),
                }),
            })
            const result = await response.json();
            console.log(result);
            setUser(result.user);
            navigate('/')

        } catch (e) {
            console.log(e);
            setError(String(e))
        }

    }
    return (
        <main>
            <p>{error}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Username</span>
                    <input type="text" name='username' />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" name='password' />
                </label>
                <button type="submit">Login</button>
            </form>
        </main>
    );
};

export default Login