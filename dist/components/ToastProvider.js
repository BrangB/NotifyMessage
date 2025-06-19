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
const getPositionStyle = (position) => {
    const style = {
        position: 'fixed',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    };
    const [vertical, horizontal] = position.split('-');
    if (vertical === 'top')
        style.top = 20;
    if (vertical === 'bottom')
        style.bottom = 20;
    if (horizontal === 'left')
        style.left = 20;
    else if (horizontal === 'right')
        style.right = 20;
    else
        style.left = '50%';
    if (horizontal === 'center') {
        style.transform = 'translateX(-50%)';
        style.alignItems = 'center';
    }
    return style;
};
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const showToast = (message, type, options) => {
        const id = Date.now();
        const position = (options === null || options === void 0 ? void 0 : options.position) || 'top-right';
        setToasts(prev => [...prev, { id, message, type, position }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };
    return (_jsxs(ToastContext.Provider, { value: { showToast }, children: [children, [
                'top-left',
                'top-center',
                'top-right',
                'bottom-left',
                'bottom-center',
                'bottom-right',
            ].map(pos => {
                const group = toasts.filter(t => t.position === pos);
                if (group.length === 0)
                    return null;
                return (_jsx("div", { style: getPositionStyle(pos), children: group.map(t => (_jsx(Toast, { message: t.message, type: t.type, onClose: () => setToasts(prev => prev.filter(toast => toast.id !== t.id)) }, t.id))) }, pos));
            })] }));
};
