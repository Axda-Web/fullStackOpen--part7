import { useState } from 'react';
import Notification from './Notification';

import { useDispatch } from 'react-redux';
import { login } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            dispatch(login(credentials));
            dispatch(
                setNotification(
                    { type: 'success', content: 'Your are logged in!' },
                    5
                )
            );
            setCredentials({ username: '', password: '' });
        } catch (exception) {
            dispatch(
                setNotification(
                    { type: 'error', content: 'Wrong username or password' },
                    5
                )
            );
        }
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
