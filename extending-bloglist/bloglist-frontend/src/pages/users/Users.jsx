import { useQuery } from 'react-query';
import userService from '../../services/users';
import { Link } from 'react-router-dom';

const Users = () => {
    const {
        data: users,
        isLoading,
        isError,
    } = useQuery('users', userService.getAll, {
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    return (
        <section>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>
                                    {user.name}
                                </Link>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};
export default Users;
