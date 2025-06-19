import React, { createContext, useContext, useState } from 'react';
import Toast from './Toast';

type ToastType = 'success' | 'error';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
  position: ToastPosition;
};

type ToastContextType = {
  showToast: (
    message: string,
    type: ToastType,
    options?: { position?: ToastPosition }
  ) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

const getPositionStyle = (position: ToastPosition): React.CSSProperties => {
  const style: React.CSSProperties = {
    position: 'fixed',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const [vertical, horizontal] = position.split('-');

  if (vertical === 'top') style.top = 20;
  if (vertical === 'bottom') style.bottom = 20;

  if (horizontal === 'left') style.left = 20;
  else if (horizontal === 'right') style.right = 20;
  else style.left = '50%';

  if (horizontal === 'center') {
    style.transform = 'translateX(-50%)';
    style.alignItems = 'center';
  }

  return style;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (
    message: string,
    type: ToastType,
    options?: { position?: ToastPosition }
  ) => {
    const id = Date.now();
    const position = options?.position || 'top-right';

    setToasts(prev => [...prev, { id, message, type, position }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {[
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ].map(pos => {
        const group = toasts.filter(t => t.position === pos);
        if (group.length === 0) return null;
        return (
          <div key={pos} style={getPositionStyle(pos as ToastPosition)}>
            {group.map(t => (
              <Toast
                key={t.id}
                message={t.message}
                type={t.type}
                onClose={() =>
                  setToasts(prev => prev.filter(toast => toast.id !== t.id))
                }
              />
            ))}
          </div>
        );
      })}
    </ToastContext.Provider>
  );
};