import { Link } from 'react-router-dom';

import { useUserValue, useUserDispatch } from '../UserContext';

const Navbar = () => {
    const user = useUserValue();
    const dispatch = useUserDispatch();

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser');
        dispatch({ type: 'SET_USER', payload: null });
    };

    if (!user) return null;

    const headerStyle = {
        width: 250,
        display: 'flex',
        justifyContent: 'space-between',
    };

    return (
        <header style={headerStyle}>
            <Link to="/">Blogs</Link>
            <Link to="/users">Users</Link>
            <span>{user.username} logged in</span>
            <button onClick={handleLogout}>Logout</button>
        </header>
    );
};
export default Navbar;
