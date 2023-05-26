import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserValue, useUserDispatch } from '../UserContext';

const ProtectedRoute = ({ children }) => {
    let user = useUserValue();
    const userDispatch = useUserDispatch();

    const persistedUser = JSON.parse(localStorage.getItem('loggedBlogappUser'));

    useEffect(() => {
        if (!user && persistedUser) {
            userDispatch({ type: 'SET_USER', payload: persistedUser });
        }
    }, [persistedUser]);

    if (!user) return <Navigate to="/login" replace={true} />;

    return children;
};
export default ProtectedRoute;
