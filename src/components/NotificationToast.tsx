import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ToastMessage {
  id: string;
  message: string;
  subtext?: string;
  type: 'info' | 'success' | 'warning' | 'system';
  icon?: string;
  duration?: number;
}

interface NotificationToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

const typeStyles: Record<string, { border: string; glow: string; dot: string; label: string }> = {
  info:    { border: 'rgba(0,212,255,0.2)',  glow: 'rgba(0,212,255,0.06)', dot: 'bg-os-cyan',  label: 'SYS' },
  success: { border: 'rgba(0,255,136,0.2)',  glow: 'rgba(0,255,136,0.06)', dot: 'bg-os-green', label: 'OK ' },
  warning: { border: 'rgba(255,184,0,0.2)',  glow: 'rgba(255,184,0,0.06)', dot: 'bg-os-amber', label: 'WARN' },
  system:  { border: 'rgba(0,212,255,0.15)', glow: 'rgba(0,212,255,0.04)', dot: 'bg-os-cyan',  label: 'OS ' },
};

const Toast = ({ toast, onRemove }: { toast: ToastMessage; onRemove: (id: string) => void }) => {
  const style = typeStyles[toast.type] || typeStyles.info;
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timerRef.current = setTimeout(() => onRemove(toast.id), toast.duration ?? 4000);
    return () => clearTimeout(timerRef.current);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="flex items-start gap-3 px-3 py-2.5 rounded-lg min-w-[240px] max-w-[300px] cursor-pointer group"
      style={{
        background: 'rgba(4, 10, 20, 0.95)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${style.border}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${style.glow}`,
      }}
      onClick={() => onRemove(toast.id)}
    >
      {/* Icon */}
      <div className="shrink-0 mt-0.5">
        {toast.icon ? (
          <span className="text-base">{toast.icon}</span>
        ) : (
          <div className={`w-2 h-2 rounded-full ${style.dot} animate-pulse mt-1`} style={{ boxShadow: `0 0 6px ${style.border}` }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-mono text-[8px] tracking-widest text-os-muted/50">{style.label}</span>
          <div className="flex-1 h-px" style={{ background: style.border }} />
        </div>
        <p className="font-mono text-[11px] text-os-text/90 leading-snug">{toast.message}</p>
        {toast.subtext && (
          <p className="font-mono text-[9px] text-os-muted/60 mt-0.5">{toast.subtext}</p>
        )}
      </div>

      {/* Close hint */}
      <span className="font-mono text-[8px] text-os-muted/20 group-hover:text-os-muted/50 transition-colors shrink-0 mt-0.5">✕</span>
    </motion.div>
  );
};

const NotificationToast = ({ toasts, onRemove }: NotificationToastProps) => {
  return (
    <div className="fixed top-4 right-4 z-[300] flex flex-col gap-2 pointer-events-auto">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast;
