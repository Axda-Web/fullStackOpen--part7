import { useState } from 'react';
import blogService from '../services/blogs';

import { useDispatch, useSelector } from 'react-redux';
import { addBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { selectUser } from '../reducers/loginReducer';

const NewBlogForm = ({ toggleVisibility }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
    });
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

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
            dispatch(addBlog(newBlog, blogService.setToken(user.token)));
            dispatch(
                setNotification(
                    {
                        type: 'success',
                        content: `A new blog ${newBlog.title} by ${newBlog.author} added`,
                    },
                    5
                )
            );
            setNewBlog({ title: '', author: '', url: '' });
            toggleVisibility();
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
