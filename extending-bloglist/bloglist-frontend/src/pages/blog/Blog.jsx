import blogService from '../../services/blogs';
import { useNotificationDispatch } from '../../NotificationContext';
import { useUserValue } from '../../UserContext';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CommentsSection from '../../components/CommentsSection';

const Blog = () => {
    const notificationDispatch = useNotificationDispatch();
    const user = useUserValue();
    const { blogId } = useParams();
    const navigate = useNavigate();
    const {
        data: blogs,
        isLoading,
        isError,
    } = useQuery('blogs', blogService.getAll);

    const queryClient = useQueryClient();

    const likeBlogMutation = useMutation(blogService.updateLikes, {
        onSuccess: (updatedBlog) => {
            const blogs = queryClient.getQueryData('blogs');
            queryClient.setQueryData(
                'blogs',
                blogs.map((blog) =>
                    blog.id === updatedBlog.id ? updatedBlog : blog
                )
            );
            notificationDispatch({
                type: 'ADD',
                payload: `Blog ${updatedBlog.title} updated`,
            });
            console.log('*** user: ', user);
        },
        onError: (error) => {
            console.log('🚀 ~ file: Blog.jsx:37 ~ Blog ~ error:', error);
            notificationDispatch({
                type: 'ADD',
                payload: 'You are not authorized to update this item',
            });
        },
    });

    const currentBlog = blogs.find((blog) => blog.id === blogId);

    const deleteBlogMutation = useMutation(blogService.remove, {
        onSuccess: () => {
            const blogs = queryClient.getQueryData('blogs');
            queryClient.setQueryData(
                'blogs',
                blogs.filter((blog) => blog.id !== currentBlog.id)
            );
            notificationDispatch({
                type: 'ADD',
                payload: `Blog ${currentBlog.title} deleted`,
            });
            navigate('/');
        },
        onError: (error) => {
            console.log('🚀 ~ file: Blog.jsx:27 ~ Blog ~ error:', error);
            notificationDispatch({
                type: 'ADD',
                payload: 'Something went wrong... Try again',
            });
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    const handleLikeClick = async () => {
        const updatedBlog = {
            ...currentBlog,
            likes: currentBlog.likes + 1,
        };

        likeBlogMutation.mutate({
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

    if (!user) return <div>You must be logged in</div>;

    return (
        <>
            <div>
                <h1>{currentBlog.title}</h1>
                <br />
                <Link to={currentBlog.url}>{currentBlog.url}</Link>
                <br />
                <span id="likes-count">{currentBlog.likes}</span>
                <button
                    id="like-button"
                    style={{ marginLeft: 10 }}
                    onClick={handleLikeClick}
                >
                    like
                </button>
                <br />
                {currentBlog.author}
                <br />
                {currentBlog.user.username === user.username && (
                    <button
                        id="remove-button"
                        onClick={() => handleBlogDelete(currentBlog)}
                    >
                        Remove
                    </button>
                )}
            </div>
            <CommentsSection blog={currentBlog} />
        </>
    );
};

export default Blog;
