import blogService from '../../services/blogs';

import { useNotificationDispatch } from '../../NotificationContext';
import { useUserValue } from '../../UserContext';

import { useQueryClient, useMutation, useQuery } from 'react-query';

import { Link, useParams } from 'react-router-dom';

const Blog = () => {
    const dispatch = useNotificationDispatch();
    const user = useUserValue();
    const { blogId } = useParams();
    const {
        data: blogs,
        isLoading,
        isError,
    } = useQuery('blogs', blogService.getAll);

    const queryClient = useQueryClient();

    const voteBlogMutation = useMutation(blogService.update, {
        onSuccess: (updatedBlog) => {
            const blogs = queryClient.getQueryData('blogs');
            queryClient.setQueryData(
                'blogs',
                blogs.map((blog) =>
                    blog.id === updatedBlog.id ? updatedBlog : blog
                )
            );
            dispatch({
                type: 'ADD',
                payload: `Blog ${updatedBlog.title} updated`,
            });
        },
        onError: (error) => {
            console.log('🚀 ~ file: Blog.jsx:37 ~ Blog ~ error:', error);
            dispatch({
                type: 'ADD',
                payload: 'You are not authorized to update this item',
            });
        },
    });

    const deleteBlogMutation = useMutation(blogService.remove, {
        onSuccess: (blogToDelete) => {
            const blogs = queryClient.getQueryData('blogs');
            queryClient.setQueryData(
                'blogs',
                blogs.filter((blog) => blog.id !== blogToDelete.id)
            );
            dispatch({
                type: 'ADD',
                payload: `Blog ${blogToDelete.title} deleted`,
            });
        },
        onError: (error) => {
            console.log('🚀 ~ file: Blog.jsx:27 ~ Blog ~ error:', error);
            dispatch({
                type: 'ADD',
                payload: 'Something went wrong... Try again',
            });
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    const blog = blogs.find((blog) => blog.id === blogId);

    const handleLikeClick = async () => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
        };

        voteBlogMutation.mutate({
            id: updatedBlog.id,
            blog: updatedBlog,
            token: user.token,
        });
    };

    const handleBlogDelete = async (blogToRemove) => {
        if (
            !window.confirm(
                `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
            )
        ) {
            return;
        }
        deleteBlogMutation.mutate({
            id: blogToRemove.id,
            token: user.token,
        });
    };

    return (
        <div>
            <h1>{blog.title}</h1>
            <br />
            <Link to={blog.url}>{blog.url}</Link>
            <br />
            <span id="likes-count">{blog.likes}</span>
            <button
                id="like-button"
                style={{ marginLeft: 10 }}
                onClick={handleLikeClick}
            >
                like
            </button>
            <br />
            {blog.author}
            <br />
            {blog.user.username === user.username && (
                <button
                    id="remove-button"
                    onClick={() => handleBlogDelete(blog)}
                >
                    Remove
                </button>
            )}
        </div>
    );
};

export default Blog;
