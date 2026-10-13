import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = 'max-w-lg',
  hideHeader = false 
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#0f1115]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 z-[9999] overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-[32px] sm:rounded-[36px] ${maxWidth} w-full shadow-2xl overflow-hidden transition-all relative my-auto`} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Floating Close Button */}
        <button 
          type="button" 
          className="absolute top-5 right-5 z-20 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 border-none w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer" 
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {!hideHeader && (
          <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
            <h3 className="text-xl font-bold text-[#1e2025] m-0">{title}</h3>
          </div>
        )}

        <div className={hideHeader ? 'p-0' : 'p-7'}>
          {children}
        </div>
      </div>
    </div>
  );
}
