import { createSlice } from '@reduxjs/toolkit';
import blogServices from '../services/blogs';

const initialState = [];

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            return action.payload;
        },
        addLike: (state, action) => {
            return state.map((anecdote) =>
                anecdote.id === action.payload.id ? action.payload : anecdote
            );
        },
        appendBlog: (state, action) => {
            return [...state, action.payload];
        },
        deleteBlog: (state, action) => {
            return state.filter((blog) => blog.id !== action.payload);
        },
    },
});

export const { setBlogs, addLike, appendBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogServices.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const addBlog = (blog, token) => {
    return async (dispatch) => {
        const newBlog = await blogServices.create(blog, token);
        dispatch(appendBlog(newBlog));
    };
};

export const likeBlog = (id, blog, token) => {
    return async (dispatch) => {
        const updatedBlog = await blogServices.update(id, blog, token);
        dispatch(addLike(updatedBlog));
    };
};

export const removeBlog = (id, token) => {
    return async (dispatch) => {
        await blogServices.remove(id, token);
        dispatch(deleteBlog(id));
    };
};

export const selectBlogs = (state) => state.blogs;
