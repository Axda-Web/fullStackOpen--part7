import { useEffect, useRef } from 'react';
import './index.css';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import { useDispatch, useSelector } from 'react-redux';
import { selectBlogs, initializeBlogs } from './reducers/blogReducer';
import { selectUser, setUser } from './reducers/loginReducer';

const App = () => {
    const newBlogFormRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
        }
    }, [dispatch]);

    const blogs = useSelector(selectBlogs);
    const user = useSelector(selectUser);

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser');
        dispatch(setUser(null));
    };

    const toggleVisibility = () => {
        newBlogFormRef.current.toggleVisibility();
    };

    return (
        <>
            {!user ? (
                <LoginForm />
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
                        <NewBlogForm toggleVisibility={toggleVisibility} />
                    </Togglable>
                    {!blogs.length ? (
                        <div>Loading...</div>
                    ) : (
                        <BlogList user={user} />
                    )}
                </div>
            )}
        </>
    );
};

export default App;
