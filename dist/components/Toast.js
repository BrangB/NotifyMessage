import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
const Toast = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300);
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);
    const bgColor = type === 'success' ? '#16a34a' : '#dc2626';
    return (_jsx("div", { style: {
            backgroundColor: bgColor,
            color: 'white',
            padding: '10px 16px',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            opacity: visible ? 1 : 0,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        }, children: message }));
};
export default Toast;
