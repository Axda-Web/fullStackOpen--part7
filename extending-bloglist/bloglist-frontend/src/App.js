import { useEffect, useRef } from 'react';
import './index.css';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import { useUserValue, useUserDispatch } from './UserContext';

const App = () => {
    const newBlogFormRef = useRef();
    const user = useUserValue();
    const dispatch = useUserDispatch();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            dispatch({ type: 'SET_USER', payload: JSON.parse(loggedUserJSON) });
        }
    }, [dispatch]);

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser');
        dispatch({ type: 'SET_USER', payload: null });
    };

    const toggleVisibility = () => {
        newBlogFormRef.current.toggleVisibility({
            type: 'SET_USER',
            payload: null,
        });
    };

    if (!user) return <LoginForm />;

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <p>{user.username} logged in</p>
            <button onClick={handleLogout}>Logout</button>
            <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
                <NewBlogForm toggleVisibility={toggleVisibility} />
            </Togglable>
            <BlogList user={user} />
        </div>
    );
};

export default App;
