import React, { useEffect } from 'react';

type ToastProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? '#16a34a' : '#dc2626';

  return (
    <div style={{
      backgroundColor: bgColor,
      color: 'white',
      padding: '10px 16px',
      borderRadius: '6px',
      marginBottom: '10px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
    }}>
      {message}
    </div>
  );
};

export default Toast;
