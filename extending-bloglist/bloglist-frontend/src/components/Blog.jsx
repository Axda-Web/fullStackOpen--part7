import { useState } from 'react';
import blogService from '../services/blogs';

import { useNotificationDispatch } from '../NotificationContext';
import { useUserValue } from '../UserContext';

import { useQueryClient, useMutation } from 'react-query';

const Blog = ({ blog, showRemoveBtn }) => {
    const [showDetails, setShowDetails] = useState(false);

    const dispatch = useNotificationDispatch();
    const user = useUserValue();

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
        },
    });
    const deleteBlogMutation = useMutation(blogService.remove, {
        onSuccess: (blogToDelete) => {
            const blogs = queryClient.getQueryData('blogs');
            queryClient.setQueryData(
                'blogs',
                blogs.filter((blog) => blog.id !== blogToDelete.id)
            );
        },
    });

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    const handleLikeClick = async () => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
        };

        try {
            voteBlogMutation.mutate({
                id: updatedBlog.id,
                blog: updatedBlog,
                token: user.token,
            });
            dispatch({
                type: 'ADD',
                payload: `Blog ${updatedBlog.title} updated`,
            });
        } catch (exception) {
            dispatch({
                type: 'ADD',
                payload: 'You are not authorized to update this item',
            });
        }
    };

    const handleBlogDelete = async (blogToRemove) => {
        if (
            !window.confirm(
                `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
            )
        ) {
            return;
        }
        try {
            deleteBlogMutation.mutate({
                id: blogToRemove.id,
                token: user.token,
            });
            dispatch({
                type: 'ADD',
                payload: `Blog ${blogToRemove.title} deleted`,
            });
        } catch (exception) {
            dispatch({
                type: 'ADD',
                payload: 'Something went wrong... Try again',
            });
        }
    };

    return (
        <div style={blogStyle} className="blog">
            {!showDetails ? (
                <div>
                    {blog.title}
                    {blog.author}
                    <button
                        style={{ marginLeft: 10 }}
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? 'hide' : 'view'}
                    </button>
                </div>
            ) : (
                <div>
                    {blog.title}
                    <button
                        style={{ marginLeft: 10 }}
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? 'hide' : 'view'}
                    </button>
                    <br />
                    {blog.url}
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
                    {showRemoveBtn && (
                        <button
                            id="remove-button"
                            onClick={() => handleBlogDelete(blog)}
                        >
                            Remove
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Blog;
