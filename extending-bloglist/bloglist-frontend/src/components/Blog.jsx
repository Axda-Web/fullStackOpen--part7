import { useState } from 'react';
import blogService from '../services/blogs';

import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { selectUser } from '../reducers/loginReducer';

const Blog = ({ blog, showRemoveBtn, setShowRemoveBtn }) => {
    const [showDetails, setShowDetails] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(selectUser);

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
            dispatch(
                likeBlog(
                    updatedBlog.id,
                    updatedBlog,
                    blogService.setToken(user.token)
                )
            );
            dispatch(
                setNotification(
                    {
                        type: 'success',
                        content: `Blog ${updatedBlog.title} updated`,
                    },
                    5
                )
            );
        } catch (exception) {
            dispatch(
                setNotification(
                    {
                        type: 'error',
                        content: 'You are not authorized to update this item',
                    },
                    5
                )
            );
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
            dispatch(
                removeBlog(blogToRemove.id, blogService.setToken(user.token))
            );
            dispatch(
                setNotification(
                    {
                        type: 'success',
                        content: `Blog ${blogToRemove.title} deleted`,
                    },
                    5
                )
            );
        } catch (exception) {
            dispatch(
                setNotification(
                    {
                        type: 'error',
                        content: 'Something went wrong... Try again',
                    },
                    5
                )
            );
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
