import React from 'react';
type ToastProps = {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
};
declare const Toast: React.FC<ToastProps>;
export default Toast;
