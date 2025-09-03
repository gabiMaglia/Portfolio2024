'use client'

import { useEffect, useRef } from 'react';
import { IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export default function ProjectModal({ open, onClose, children }) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const t = useTranslations('ProjectModal');

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [open]);

  if (!open) return null;

  const onOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  return (
    <dialog
      ref={overlayRef}
      onClick={onOverlayClick}
      className="fixed inset-0 z-50 backdrop-blur-[1px] flex items-center justify-center rounded-3xl"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-3xl rounded-2xl bg-white dark:bg-neutral-950 border border-gray-200 dark:border-white/10 shadow-2xl p-6 animate-in fade-in duration-150"
      >
        {/* Header modal */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">{t('title')}</div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-neutral-800 transition text-gray-600 dark:text-gray-300"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[75vh] overflow-y-auto pr-1 scrollbar-nice">
          {children}
        </div>
      </div>
    </dialog>
  );
}
