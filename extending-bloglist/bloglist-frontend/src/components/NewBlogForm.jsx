import { useState } from 'react';
import blogService from '../services/blogs';
import { useQueryClient, useMutation } from 'react-query';
import { useUserValue } from '../UserContext';
import { useNotificationDispatch } from '../NotificationContext';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const NewBlogForm = ({ toggleVisibility }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
    });

    const user = useUserValue();
    const notificationDispatch = useNotificationDispatch();

    const queryClient = useQueryClient();
    const addBlogMutation = useMutation(blogService.create, {
        onSuccess: (newBlog) => {
            const blogs = queryClient.getQueryData('blogs');
            queryClient.setQueryData('blogs', blogs.concat(newBlog));
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBlog((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmitNewBlog = async (e) => {
        e.preventDefault();

        try {
            addBlogMutation.mutate({ blog: newBlog, token: user.token });
            notificationDispatch({
                type: 'ADD',
                payload: {
                    content: `A new blog ${newBlog.title} by ${newBlog.author} added`,
                    severity: 'success',
                },
            });
            setNewBlog({ title: '', author: '', url: '' });
            toggleVisibility();
        } catch (exception) {
            notificationDispatch({
                type: 'ADD',
                payload: {
                    content: 'Something went wrong... Try again',
                    severity: 'error',
                },
            });
        }
    };

    return (
        <Box component="section">
            <Typography
                component="h2"
                textAlign="center"
                fontSize="1.5rem"
                fontWeight={500}
                mb="20px"
            >
                Create new Blog
            </Typography>
            <form onSubmit={handleSubmitNewBlog}>
                <Stack spacing={3}>
                    <TextField
                        name="title"
                        label="Title"
                        id="title"
                        onChange={handleChange}
                        value={newBlog.title}
                    />
                    <TextField
                        name="author"
                        label="Author"
                        id="author"
                        onChange={handleChange}
                        value={newBlog.author}
                    />
                    <TextField
                        name="url"
                        label="url"
                        id="url"
                        onChange={handleChange}
                        value={newBlog.url}
                    />
                    <Button variant="contained" type="submit">
                        Create
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};
export default NewBlogForm;
