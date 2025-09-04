'use client';

import React, { useEffect, useRef } from 'react';
import { IconX } from '@tabler/icons-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export default function ProjectModal({ open, onClose, title, children }) {
  const overlayRef = useRef(null);
  const titleId = 'project-modal-title';
  const prefersReduced = useReducedMotion();

  // ESC para cerrar
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

  const onOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  // Duraciones y easings “fluid + smooth”
  const tOverlayIn  = { duration: 0.16, ease: [0.4, 0, 0.2, 1] };
  const tOverlayOut = { duration: 0.14, ease: [0.4, 0, 1, 1] };
  const tPanelIn    = { duration: 0.22, ease: [0.16, 1, 0.3, 1] };

  // Variantes
  const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };

  const panelVariants = prefersReduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
      }
    : {
        hidden: { opacity: 0, y: 10, scale: 0.985 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 10, scale: 0.985 }
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.dialog
          ref={overlayRef}
          onClick={onOverlayClick}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[1px] rounded-3xl"
          aria-modal="true"
          role="dialog"
          aria-labelledby={titleId}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          transition={open ? tOverlayIn : tOverlayOut}
        >
          <motion.div
            className="w-full max-w-3xl rounded-2xl bg-white dark:bg-neutral-950 border border-gray-200 dark:border-white/10 shadow-2xl p-6 will-change-transform"
            variants={panelVariants}
            transition={tPanelIn}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div id={titleId} className="text-sm text-gray-500 dark:text-gray-400">
                {title}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-full border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-neutral-800 transition text-gray-600 dark:text-gray-300"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Content */}
            <motion.div
              className="max-h-[75vh] overflow-y-auto pr-1 scrollbar-nice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
}
