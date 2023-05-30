import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { useUserValue } from '../UserContext';
import { useNotificationDispatch } from '../NotificationContext';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const CommentsSection = ({ blog }) => {
    const [showCommentForm, setShowCommentForm] = useState(false);
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
                payload: { content: 'Comment added', severity: 'success' },
            });
        },
        onError: (error) => {
            console.log(
                '🚀 ~ file: CommentsSection.jsx:25 ~ CommentsSection ~ error:',
                error
            );
            notificationDispatch({
                type: 'ADD',
                payload: {
                    content: "Comment field can't be empty",
                    severity: 'error',
                },
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
        <Box component="section" maxWidth="600px" margin="50px auto">
            <Typography
                component="h3"
                fontSize="1.25rem"
                fontWeight="700"
                textAlign="center"
            >
                Comments
            </Typography>
            {blog.comments && (
                <List>
                    {blog.comments.map((comment) => (
                        <>
                            <ListItem key={comment} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="unknown" src="" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Unknown user"
                                    secondary={
                                        <Typography
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {comment}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                    ))}
                </List>
            )}
            <Box>
                {showCommentForm ? (
                    <form onSubmit={handleSubmit}>
                        <Stack>
                            <TextField
                                multiline
                                minRows={4}
                                sx={{ width: '100%', margin: '50px auto 20px' }}
                                name="comment"
                                label="Comment"
                            />
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                spacing={2}
                            >
                                <Button variant="contained" type="submit">
                                    Add Comment
                                </Button>
                                <Button
                                    variant="text"
                                    type="button"
                                    onClick={() => setShowCommentForm(false)}
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                ) : (
                    <Button
                        sx={{
                            display: 'block',
                            margin: '30px auto',
                        }}
                        variant="contained"
                        type="submit"
                        onClick={() => setShowCommentForm(true)}
                    >
                        Add Comment
                    </Button>
                )}
            </Box>
        </Box>
    );
};
export default CommentsSection;
