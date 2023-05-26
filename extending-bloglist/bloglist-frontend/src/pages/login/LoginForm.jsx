import { useState } from 'react';
import Notification from '../../components/Notification';

import { useMutation, useQueryClient } from 'react-query';
import loginService from '../../services/login';

import { useNotificationDispatch } from '../../NotificationContext';
import { useUserDispatch } from '../../UserContext';

import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const notificationDispatch = useNotificationDispatch();
    const userDispatch = useUserDispatch();

    const queryClient = useQueryClient();
    const loginMutation = useMutation(loginService.login, {
        onSuccess: (newUser) => {
            queryClient.invalidateQueries(['user', 'blogs']);
            userDispatch({ type: 'SET_USER', payload: newUser });
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(newUser)
            );
            notificationDispatch({
                type: 'ADD',
                payload: 'Your are logged in!',
            });
            setCredentials({ username: '', password: '' });
            navigate('/');
        },
        onError: (error) => {
            console.log(
                '🚀 ~ file: LoginForm.jsx:46 ~ LoginForm ~ error:',
                error
            );
            notificationDispatch({
                type: 'ADD',
                payload: 'Wrong username or password',
            });
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        loginMutation.mutate(credentials);
    };

    return (
        <>
            <h2>Log in to application</h2>
            <Notification />
            <form
                onSubmit={handleLogin}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    rowGap: 15,
                }}
            >
                <input
                    type="text"
                    name="username"
                    id="username-input"
                    onChange={handleChange}
                    value={credentials.username}
                />
                <input
                    type="password"
                    name="password"
                    id="password-input"
                    onChange={handleChange}
                    value={credentials.password}
                />
                <input id="login-button" type="submit" value="Login" />
            </form>
        </>
    );
};
export default LoginForm;
