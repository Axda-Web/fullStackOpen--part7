import { Route, Routes } from 'react-router-dom';
import pagesData from './pagesData';

import ProtectedRoute from '../components/ProtectedRoute';

const Router = () => {
    const pageRoutes = pagesData.map(({ path, component, title }) =>
        title !== 'login' ? (
            <Route
                key={title}
                path={path}
                element={<ProtectedRoute>{component}</ProtectedRoute>}
            />
        ) : (
            <Route key={title} path={path} element={component} />
        )
    );

    return <Routes>{pageRoutes}</Routes>;
};

export default Router;
