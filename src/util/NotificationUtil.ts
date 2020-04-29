import { notification } from 'antd';

export function notifySucess(title: string, message: string) {
    notification.success({
        message: title,
        description: message,
        placement: "bottomRight"
    });
}

export function notifyError(title: string, message: string) {
    notification.error({
        message: title,
        description: message,
        placement: "bottomRight"
    });
};
