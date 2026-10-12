import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import styles from './Toast.module.css';

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className={styles.container} aria-live="polite">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] || Info;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`${styles.toast} ${styles[toast.type] || styles.info}`}
            >
              <Icon size={18} className={styles.icon} />
              <div className={styles.content}>
                {toast.title && <h5 className={styles.title}>{toast.title}</h5>}
                <p className={styles.message}>{toast.message}</p>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => removeToast(toast.id)}
                aria-label="Close notification"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default ToastContainer;
