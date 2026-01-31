'use client';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: 'bg-green-300',
    error: 'bg-red-500',
    info: 'bg-blue-100'
  }[type];

  const textColor = type === 'error' ? 'text-white' : 'text-blackish';

  return (
    <div
      className={`fixed bottom-4 right-4 ${bgColor} ${textColor} px-6 py-3 rounded-lg shadow-lg
                  transform transition-all duration-300 ease-in-out animate-slide-up z-50`}
      role="alert"
    >
      <div className="flex items-center gap-2">
        <span className="text-body-2 font-bold">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-lg font-bold hover:opacity-70 transition-opacity"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}
