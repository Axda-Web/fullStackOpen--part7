import { useEffect } from 'react';
import {
    useNotificationValue,
    useNotificationDispatch,
} from '../NotificationContext';

const Notification = () => {
    const dispatch = useNotificationDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: 'REMOVE',
            });
        }, 5000);
    });

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
    };

    const notification = useNotificationValue();

    if (!notification) return null;

    return <div style={style}>{notification}</div>;
};

export default Notification;
