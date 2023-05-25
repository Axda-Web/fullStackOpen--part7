import Blog from './Blog';

import { useQuery } from 'react-query';
import blogService from '../services/blogs';

const BlogList = ({ user }) => {
    const {
        data: blogs,
        isLoading,
        isError,
    } = useQuery('blogs', () => blogService.getAll());

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

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
