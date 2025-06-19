import React from 'react';
type ToastType = 'success' | 'error';
type ToastContextType = {
    showToast: (message: string, type: ToastType) => void;
};
export declare const useToast: () => ToastContextType;
export declare const ToastProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
