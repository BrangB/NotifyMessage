import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
import Toast from './Toast';
const ToastContext = createContext(undefined);
export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx)
        throw new Error('useToast must be used within ToastProvider');
    return ctx;
};
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const showToast = (message, type) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };
    return (_jsxs(ToastContext.Provider, { value: { showToast }, children: [children, _jsx("div", { style: { position: 'fixed', top: 20, right: 20, zIndex: 9999 }, children: toasts.map(t => (_jsx(Toast, { message: t.message, type: t.type, onClose: () => setToasts(prev => prev.filter(toast => toast.id !== t.id)) }, t.id))) })] }));
};
