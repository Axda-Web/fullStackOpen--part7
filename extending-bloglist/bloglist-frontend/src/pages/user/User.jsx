import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import userService from '../../services/users';
import { Link } from 'react-router-dom';

const User = () => {
    const { userId } = useParams();
    const {
        data: users,
        isLoading,
        isError,
    } = useQuery('users', userService.getAll, {
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    const user = users.find((user) => user.id === userId);
    const blogs = user.blogs;

    return (
        <div>
            <h1>{user.name}</h1>
            <h3>Added blogs</h3>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default User;
