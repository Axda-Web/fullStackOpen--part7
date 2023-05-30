import { useState } from 'react';
import blogService from '../../services/blogs';
import { useNotificationDispatch } from '../../NotificationContext';
import { useUserValue } from '../../UserContext';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import CommentsSection from '../../components/CommentsSection';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Blog = () => {
    const [likeBlog, setLikeBlog] = useState(false);
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
                payload: {
                    content: `Blog ${updatedBlog.title} updated`,
                    severity: 'success',
                },
            });
        },
        onError: (error) => {
            console.log('🚀 ~ file: Blog.jsx:37 ~ Blog ~ error:', error);
            notificationDispatch({
                type: 'ADD',
                payload: {
                    content: 'You are not authorized to update this item',
                    severity: 'error',
                },
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
                payload: {
                    content: `Blog ${currentBlog.title} deleted`,
                    severity: 'success',
                },
            });
            navigate('/');
        },
        onError: (error) => {
            console.log('🚀 ~ file: Blog.jsx:27 ~ Blog ~ error:', error);
            notificationDispatch({
                type: 'ADD',
                payload: {
                    content: 'Something went wrong... Try again',
                    severity: 'error',
                },
            });
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    const handleLikeClick = async () => {
        const updatedBlog = {
            ...currentBlog,
            likes: likeBlog ? currentBlog.likes - 1 : currentBlog.likes + 1,
        };

        likeBlogMutation.mutate({
            id: updatedBlog.id,
            blog: updatedBlog,
            token: user.token,
        });
        setLikeBlog((prevState) => !prevState);
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
            <Typography
                component="h2"
                fontSize="2rem"
                fontWeight={700}
                textAlign="center"
                py="50px"
            >
                Blog
            </Typography>
            <Card
                sx={{
                    width: 'max-content',
                    minWidth: '400px',
                    margin: '0 auto',
                }}
            >
                <CardContent>
                    <Typography
                        component="h1"
                        fontSize="2rem"
                        fontweight={700}
                        marginBottom={1}
                    >
                        {currentBlog.title}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography fontWeight={300}>
                            By{' '}
                            <Typography component="span" fontWeight={500}>
                                {currentBlog.author}
                            </Typography>
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Typography id="likes-count">
                                {currentBlog.likes}
                            </Typography>
                            {likeBlog ? (
                                <FavoriteIcon color="info" />
                            ) : (
                                <FavoriteBorderIcon color="info" />
                            )}
                        </Stack>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        width="100%"
                    >
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to={currentBlog.url}
                            >
                                Read full article
                            </Button>
                            <Button
                                variant="outlined"
                                id="like-button"
                                onClick={handleLikeClick}
                            >
                                {likeBlog ? 'Dislike' : 'Like'}
                            </Button>
                        </Stack>
                        {currentBlog.user.username === user.username && (
                            <IconButton
                                aria-label="delete"
                                id="remove-button"
                                onClick={() => handleBlogDelete(currentBlog)}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        )}
                    </Stack>
                </CardActions>
            </Card>
            <CommentsSection blog={currentBlog} />
        </>
    );
};

export default Blog;
