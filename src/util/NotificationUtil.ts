import { notification } from 'antd';

export function notifySucess(title: string, message: string) {
    notification.success({
        message: title,
        description: message,
    });
};
