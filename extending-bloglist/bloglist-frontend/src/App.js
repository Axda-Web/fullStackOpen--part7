import { BrowserRouter } from 'react-router-dom';
import Router from './pages/router';

import Navbar from './components/Navbar';
import Notification from './components/Notification';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Notification />
            <main>
                <Router />
            </main>
        </BrowserRouter>
    );
};

export default App;
