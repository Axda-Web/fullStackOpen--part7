import { Link } from 'react-router-dom';
import { useUserValue, useUserDispatch } from '../UserContext';

const Navbar = () => {
    const user = useUserValue();
    const userDispatch = useUserDispatch();

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser');
        userDispatch({ type: 'SET_USER', payload: null });
    };

    const headerStyle = {
        width: 250,
        display: 'flex',
        justifyContent: 'space-between',
    };

    if (!user) return null;

    return (
        <header style={headerStyle}>
            <Link to="/">Blogs</Link>
            <Link to="/users">Users</Link>
            <span>{user.name} logged in</span>
            <button onClick={handleLogout}>Logout</button>
        </header>
    );
};
export default Navbar;
