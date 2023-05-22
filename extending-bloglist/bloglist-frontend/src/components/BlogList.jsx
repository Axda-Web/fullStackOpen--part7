import { useSelector } from 'react-redux';
import { selectBlogs } from '../reducers/blogReducer';
import Blog from './Blog';

const BlogList = ({ user }) => {
    const blogs = useSelector(selectBlogs);

    return (
        <div>
            {blogs
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        showRemoveBtn={blog.user.username === user.username}
                    />
                ))
                .sort((a, b) => b.likes - a.likes)}
        </div>
    );
};
export default BlogList;
