import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { useUserValue } from '../UserContext';
import { useNotificationDispatch } from '../NotificationContext';

const CommentsSection = ({ blog }) => {
    const user = useUserValue();
    const notificationDispatch = useNotificationDispatch();
    const queryClient = useQueryClient();
    const commentBlogMutation = useMutation(blogService.addComment, {
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
                payload: `Comment added`,
            });
        },
        onError: (error) => {
            console.log(
                '🚀 ~ file: CommentsSection.jsx:25 ~ CommentsSection ~ error:',
                error
            );
            notificationDispatch({
                type: 'ADD',
                payload: 'You are not authorized to update this item',
            });
        },
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        const newBlog = {
            ...blog,
            comments: [...blog.comments, event.target.comment.value.trim()],
        };
        commentBlogMutation.mutate({
            id: blog.id,
            blog: newBlog,
            token: user.token,
        });
        event.target.comment.value = '';
    };
    return (
        <section>
            <h2>Comments</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="comment"
                    placeholder="Write your comment..."
                />
                <button type="submit">Add Comment</button>
            </form>
            {blog.comments && (
                <ul>
                    {blog.comments.map((comment) => (
                        <li key={comment}>{comment}</li>
                    ))}
                </ul>
            )}
        </section>
    );
};
export default CommentsSection;
