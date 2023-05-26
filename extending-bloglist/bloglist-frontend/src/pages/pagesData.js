import Home from './home';
import Login from './login';
import Users from './users';
import User from './user';
import Blog from './blog';

const pagesData = [
    {
        path: '/',
        component: <Home />,
        title: 'home',
    },
    {
        path: '/login',
        component: <Login />,
        title: 'login',
    },
    {
        path: '/users',
        component: <Users />,
        title: 'users',
    },
    {
        path: '/users/:userId',
        component: <User />,
        title: 'user',
    },
    {
        path: '/blogs/:blogId',
        component: <Blog />,
        title: 'blog',
    },
];

export default pagesData;
