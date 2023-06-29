import { useEffect } from 'react';
import {
    useNotificationValue,
    useNotificationDispatch,
} from '../NotificationContext';

import Alert from '@mui/material/Alert';

const Notification = () => {
    const notificationDispatch = useNotificationDispatch();

    useEffect(() => {
        setTimeout(() => {
            notificationDispatch({
                type: 'REMOVE',
            });
        }, 5000);
    });

    const notification = useNotificationValue();

    if (!notification.content) return null;

    return (
        <Alert severity={notification.severity}>{notification.content}</Alert>
    );
};

export default Notification;
