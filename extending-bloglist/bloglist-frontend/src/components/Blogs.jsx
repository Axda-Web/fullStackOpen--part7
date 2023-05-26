import { useRef } from 'react';
import { useQuery } from 'react-query';
import blogService from '../services/blogs';
import { Link } from 'react-router-dom';
import Togglable from './Togglable';
import NewBlogForm from './NewBlogForm';

const BlogList = () => {
    const newBlogFormRef = useRef();

    const {
        data: blogs,
        isLoading,
        isError,
    } = useQuery('blogs', () => blogService.getAll());

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        listStyleType: 'none',
        listStylePosition: 'inside',
    };

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
            <h2>blogs</h2>
            <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
                <NewBlogForm toggleVisibility={toggleVisibility} />
            </Togglable>
            <ul style={{ paddingLeft: 0 }}>
                {blogs
                    .map((blog) => (
                        <li style={blogStyle} key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>
                                {blog.title} {blog.author}
                            </Link>
                        </li>
                    ))
                    .sort((a, b) => b.likes - a.likes)}
            </ul>
        </div>
    );
};
export default BlogList;
