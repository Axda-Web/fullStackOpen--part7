import { useSelector } from 'react-redux';
import { selectNotification } from '../reducers/notificationReducer';

const Notification = () => {
    const { content, type } = useSelector(selectNotification);

    if (content === null) {
        return null;
    }
    return (
        <div
            className={`notification notification--${
                type === 'success' ? 'success' : 'error'
            }`}
        >
            {content}
        </div>
    );
};

export default Notification;
