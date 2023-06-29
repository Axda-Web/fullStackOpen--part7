import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserValue, useUserDispatch } from '../UserContext';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const user = useUserValue();
    const userDispatch = useUserDispatch();

    const mobileViewport = useMediaQuery('(max-width:425px)');

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser');
        userDispatch({ type: 'SET_USER', payload: null });
    };

    if (!user) return null;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    {mobileViewport ? (
                        <Stack
                            direction="row"
                            width="100%"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                    onClick={toggleMenu}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <SwipeableDrawer
                                    anchor="top"
                                    open={showMenu}
                                    onClose={toggleMenu}
                                    onOpen={toggleMenu}
                                >
                                    <Stack>
                                        <Link
                                            component={NavLink}
                                            to="/"
                                            color="primary"
                                            fontFamily="Roboto, sans-serif"
                                            fontSize="1.25rem"
                                            underline="none"
                                            sx={{
                                                padding: '1em 1.5em',
                                                '&:hover': {
                                                    backgroundColor: 'primary',
                                                    color: 'rgb(255, 255, 255)',
                                                },
                                                '&.active': {
                                                    backgroundColor: '#1976d2',
                                                    color: 'rgb(255, 255, 255)',
                                                },
                                            }}
                                        >
                                            Blogs
                                        </Link>
                                        <Link
                                            component={NavLink}
                                            to="/users"
                                            color="primary"
                                            fontFamily="Roboto, sans-serif"
                                            fontSize="1.25rem"
                                            underline="none"
                                            sx={{
                                                padding: '1em 1.5em',
                                                '&:hover': {
                                                    backgroundColor: 'primary',
                                                    color: 'rgb(255, 255, 255)',
                                                },
                                                '&.active': {
                                                    backgroundColor: '#1976d2',
                                                    color: 'rgb(255, 255, 255)',
                                                },
                                            }}
                                        >
                                            Users
                                        </Link>
                                    </Stack>
                                </SwipeableDrawer>
                            </Box>
                            <Stack
                                direction="row"
                                alignItems="center"
                                divider={
                                    <Divider orientation="vertical" flexItem />
                                }
                                spacing={2}
                            >
                                <Typography
                                    variant="body1"
                                    component="p"
                                    fontWeight={300}
                                    color="rgb(255, 255, 255)"
                                >
                                    <Typography
                                        component="span"
                                        fontWeight={900}
                                        color="rgb(255, 255, 255)"
                                    >
                                        {user.name}
                                    </Typography>{' '}
                                    logged in
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={handleLogout}
                                    sx={{
                                        color: 'white',
                                        borderColor: 'white',
                                    }}
                                >
                                    Log out
                                </Button>
                            </Stack>
                        </Stack>
                    ) : (
                        <Stack
                            component="nav"
                            direction="row"
                            width="100%"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Stack direction="row" spacing={4}>
                                <Link
                                    component={NavLink}
                                    to="/"
                                    color="rgb(255, 255, 255)"
                                    fontFamily="Roboto, sans-serif"
                                    underline="hover"
                                    fontSize="1.25rem"
                                    sx={{
                                        textUnderlineOffset: 5,
                                        '&.active': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Blogs
                                </Link>
                                <Link
                                    component={NavLink}
                                    to="/users"
                                    color="rgb(255, 255, 255)"
                                    fontFamily="Roboto, sans-serif"
                                    underline="hover"
                                    fontSize="1.25rem"
                                    sx={{
                                        textUnderlineOffset: 5,
                                        '&.active': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Users
                                </Link>
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                divider={
                                    <Divider orientation="vertical" flexItem />
                                }
                                spacing={2}
                            >
                                <Typography
                                    variant="body1"
                                    component="p"
                                    fontWeight={300}
                                    color="rgb(255, 255, 255)"
                                >
                                    <Typography
                                        component="span"
                                        fontWeight={900}
                                        color="rgb(255, 255, 255)"
                                    >
                                        {user.name}
                                    </Typography>{' '}
                                    logged in
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={handleLogout}
                                    sx={{
                                        color: 'white',
                                        borderColor: 'white',
                                    }}
                                >
                                    Log out
                                </Button>
                            </Stack>
                        </Stack>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default Navbar;
