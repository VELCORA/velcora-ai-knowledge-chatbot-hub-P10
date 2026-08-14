import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-none">
      <div className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-full text-xs font-medium shadow-xl border border-white/20 backdrop-blur-md">
        <span className="w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center flex-shrink-0">
          <Check size={10} strokeWidth={3} />
        </span>
        <span>{message}</span>
      </div>
    </div>
  );
};
