import { useState } from 'react';
import Notification from '../../components/Notification';
import loginService from '../../services/login';
import { useNotificationDispatch } from '../../NotificationContext';
import { useUserDispatch } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const notificationDispatch = useNotificationDispatch();
    const userDispatch = useUserDispatch();

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
            const newUser = await loginService.login(credentials);
            userDispatch({ type: 'SET_USER', payload: newUser });
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(newUser)
            );
            notificationDispatch({
                type: 'ADD',
                payload: {
                    content: 'Your are logged in!',
                    severity: 'success',
                },
            });
            setCredentials({ username: '', password: '' });
            navigate('/');
        } catch (exception) {
            console.log(
                '🚀 ~ file: LoginForm.jsx:72 ~ handleLogin ~ exception:',
                exception
            );
            notificationDispatch({
                type: 'ADD',
                payload: {
                    content: 'Wrong username or password',
                    severity: 'error',
                },
            });
        }
    };

    return (
        <Box width={300} margin="auto" marginTop="15vh">
            <Typography
                gutterBottom
                variant="h2"
                component="h2"
                fontSize={36}
                fontWeight={500}
                textAlign="center"
                textTransform="uppercase"
            >
                Log in
            </Typography>
            <Notification />
            <form onSubmit={handleLogin}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        id="username-input"
                        onChange={handleChange}
                        value={credentials.username}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        id="password-input"
                        onChange={handleChange}
                        value={credentials.password}
                    />
                    <Button
                        id="login-button"
                        type="submit"
                        variant="contained"
                        w="70%"
                    >
                        Login
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};
export default LoginForm;
