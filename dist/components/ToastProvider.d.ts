import React from 'react';
type ToastType = 'success' | 'error';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
type ToastContextType = {
    showToast: (message: string, type: ToastType, options?: {
        position?: ToastPosition;
    }) => void;
};
export declare const useToast: () => ToastContextType;
export declare const ToastProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
