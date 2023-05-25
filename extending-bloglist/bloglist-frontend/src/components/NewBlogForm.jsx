import { useState } from 'react';
import blogService from '../services/blogs';

import { useQueryClient, useMutation } from 'react-query';
import { useUserValue } from '../UserContext';
import { useNotificationDispatch } from '../NotificationContext';

const NewBlogForm = ({ toggleVisibility }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
    });

    const user = useUserValue();
    const dispatch = useNotificationDispatch();

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
            dispatch({
                type: 'ADD',
                payload: `A new blog ${newBlog.title} by ${newBlog.author} added`,
            });
            setNewBlog({ title: '', author: '', url: '' });
            toggleVisibility();
        } catch (exception) {
            dispatch({
                type: 'ADD',
                payload: 'Something went wrong... Try again',
            });
        }
    };

    return (
        <section>
            <h2>Create new</h2>
            <form
                onSubmit={handleSubmitNewBlog}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    rowGap: 15,
                    marginBottom: 30,
                }}
            >
                <div>
                    <label style={{ marginRight: 10 }} htmlFor="title">
                        Title:
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        id="title"
                        onChange={handleChange}
                        value={newBlog.title}
                    />
                </div>
                <div>
                    <label style={{ marginRight: 10 }} htmlFor="author">
                        Author:
                    </label>
                    <input
                        type="text"
                        name="author"
                        placeholder="author"
                        id="author"
                        onChange={handleChange}
                        value={newBlog.author}
                    />
                </div>
                <div>
                    <label style={{ marginRight: 10 }} htmlFor="url">
                        URL:
                    </label>
                    <input
                        type="text"
                        name="url"
                        placeholder="url"
                        id="url"
                        onChange={handleChange}
                        value={newBlog.url}
                    />
                </div>
                <input type="submit" value="Create" />
            </form>
        </section>
    );
};
export default NewBlogForm;
