import { Navigate } from 'react-router-dom';
import { useUserValue } from '../UserContext';

const ProtectedRoute = ({ children }) => {
    let user = useUserValue();

    if (localStorage.getItem('loggedBlogappUser')) {
        user = localStorage.getItem('loggedBlogappUser');
    }

    if (!user) return <Navigate to="/login" replace={true} />;

    return children;
};
export default ProtectedRoute;
