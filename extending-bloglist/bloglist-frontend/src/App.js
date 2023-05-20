import { useState, useEffect, useRef } from 'react';
import './index.css';

import blogService from './services/blogs';
import loginService from './services/login';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import { useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const newBlogFormRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            );
            setUser(user);
            setUsername('');
            setPassword('');
            dispatch(
                setNotification(
                    { type: 'success', content: 'Your are logged in!' },
                    5
                )
            );
        } catch (exception) {
            dispatch(
                setNotification(
                    { type: 'error', content: 'Wrong username or password' },
                    5
                )
            );
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser');
        setUser(null);
    };

    const handleSubmitNewBlog = async (newBlog) => {
        newBlogFormRef.current.toggleVisibility();
        try {
            const returnedBlog = await blogService.create(
                newBlog,
                blogService.setToken(user.token)
            );
            setBlogs((prevState) => [...prevState, returnedBlog]);
            dispatch(
                setNotification(
                    {
                        type: 'success',
                        content: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
                    },
                    5
                )
            );
        } catch (exception) {
            dispatch(
                setNotification(
                    {
                        type: 'error',
                        content: 'Something went wrong... Try again',
                    },
                    5
                )
            );
        }
    };

    const handleBlogUpdate = async (updatedBlog) => {
        try {
            const returnedUpddatedBlog = await blogService.update(
                updatedBlog.id,
                updatedBlog,
                blogService.setToken(user.token)
            );
            if (returnedUpddatedBlog.title) {
                const updatedBlogs = blogs.map((blog) =>
                    blog.id === returnedUpddatedBlog.id
                        ? returnedUpddatedBlog
                        : blog
                );
                setBlogs(updatedBlogs);
                dispatch(
                    setNotification(
                        {
                            type: 'success',
                            content: `Blog ${returnedUpddatedBlog.title} updated`,
                        },
                        5
                    )
                );
            } else {
                throw new Error();
            }
        } catch (exception) {
            dispatch(
                setNotification(
                    {
                        type: 'error',
                        content: 'You are not authorized to update this item',
                    },
                    5
                )
            );
        }
    };

    const handleBlogDelete = async (blogToRemove) => {
        if (
            !window.confirm(
                `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
            )
        ) {
            return;
        }
        try {
            await blogService.remove(
                blogToRemove.id,
                blogService.setToken(user.token)
            );
            const updatedBlogs = blogs.filter(
                (blog) => blog.id !== blogToRemove.id
            );
            setBlogs(updatedBlogs);
            dispatch(
                setNotification(
                    {
                        type: 'success',
                        content: `Blog ${blogToRemove.title} deleted`,
                    },
                    5
                )
            );
        } catch (exception) {
            dispatch(
                setNotification(
                    {
                        type: 'error',
                        content: 'Something went wrong... Try again',
                    },
                    5
                )
            );
        }
    };

    return (
        <>
            {!user ? (
                <LoginForm
                    username={username}
                    setUsername={setUsername}
                    pasword={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                />
            ) : (
                <div>
                    <h2>blogs</h2>
                    <Notification />
                    <p>{user.username} logged in</p>
                    <button onClick={handleLogout}>Logout</button>
                    <Togglable
                        buttonLabel="create new blog"
                        ref={newBlogFormRef}
                    >
                        <NewBlogForm
                            handleSubmitNewBlog={handleSubmitNewBlog}
                        />
                    </Togglable>
                    {blogs
                        .sort((a, b) => b.likes - a.likes)
                        .map((blog) => (
                            <Blog
                                key={blog.id}
                                blog={blog}
                                handleBlogUpdate={handleBlogUpdate}
                                handleBlogDelete={handleBlogDelete}
                                showRemoveBtn={
                                    blog.user.username === user.username
                                }
                            />
                        ))}
                </div>
            )}
        </>
    );
};

export default App;
