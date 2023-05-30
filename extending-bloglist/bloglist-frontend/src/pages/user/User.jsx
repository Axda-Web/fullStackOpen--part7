import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import userService from '../../services/users';
import BlogCard from '../../components/BlogCard';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

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
            <Typography
                component="h1"
                fontSize="2rem"
                fontWeight={700}
                textAlign="center"
                py="50px"
            >
                {user.name}
            </Typography>
            <Typography
                component="h2"
                fontSize="2rem"
                fontWeight={700}
                py="50px"
            >
                Added blogs
            </Typography>
            <Grid container spacing={4}>
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </Grid>
        </div>
    );
};
export default User;
