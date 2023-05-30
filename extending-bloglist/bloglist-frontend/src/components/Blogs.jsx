import { useRef } from 'react';
import { useQuery } from 'react-query';
import blogService from '../services/blogs';
import Togglable from './Togglable';
import NewBlogForm from './NewBlogForm';
import BlogCard from './BlogCard';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import FavoriteIcon from '@mui/icons-material/Favorite';

const BlogList = () => {
    const newBlogFormRef = useRef();

    const {
        data: blogs,
        isLoading,
        isError,
    } = useQuery('blogs', () => blogService.getAll());

    const toggleVisibility = () => {
        newBlogFormRef.current.toggleVisibility();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div>
            <Typography
                component="h1"
                fontSize="2rem"
                fontWeight={700}
                textAlign="center"
                py="50px"
            >
                Blogs
            </Typography>
            <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
                <NewBlogForm toggleVisibility={toggleVisibility} />
            </Togglable>
            <Grid container spacing={4}>
                {blogs
                    .map((blog) => <BlogCard key={blog.id} blog={blog} />)
                    .sort((a, b) => b.likes - a.likes)}
            </Grid>
        </div>
    );
};
export default BlogList;
