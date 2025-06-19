import React, { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
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

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: 'white',
        padding: '10px 16px',
        borderRadius: '6px',
        transition: 'all 0.3s ease',
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        opacity: visible ? 1 : 0,
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      }}
    >
      {message}
    </div>
  );
};

export default Toast;