import { useQuery } from 'react-query';
import userService from '../services/users';

const Users = () => {
    const {
        data: users,
        isLoading,
        isError,
    } = useQuery('users', () => userService.getAll());

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
                            <td>{user.name}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};
export default Users;
