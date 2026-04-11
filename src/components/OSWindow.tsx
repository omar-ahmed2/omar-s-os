import { useRef, useCallback } from 'react';
import Draggable from 'react-draggable';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  isMaximized: boolean;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
}

const OSWindow = ({
  id, title, isOpen, isMinimized, zIndex, onClose, onMinimize, onMaximize,
  onFocus, isMaximized, children, defaultPosition, defaultSize
}: WindowProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleMouseDown = useCallback(() => onFocus(), [onFocus]);

  if (!isOpen || isMinimized) return null;

  const windowStyle = isMaximized || isMobile
    ? { position: 'fixed' as const, inset: isMobile ? '0 0 48px 0' : '0 0 48px 0', width: '100%', height: isMobile ? 'calc(100% - 48px)' : 'calc(100% - 48px)' }
    : { width: defaultSize?.width || 700, height: defaultSize?.height || 500 };

  const content = (
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 10 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      ref={nodeRef}
      className="rounded-xl overflow-hidden flex flex-col shadow-2xl pointer-events-auto"
      style={{
        ...windowStyle,
        zIndex,
        willChange: 'transform',
        background: 'rgba(8, 18, 32, 0.85)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(0, 212, 255, 0.08)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 0 1px rgba(0, 212, 255, 0.1), inset 0 1px 0 rgba(255,255,255,0.03)',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-os-cyan/8 cursor-move select-none handle"
        style={{ background: 'rgba(5, 12, 24, 0.6)' }}
      >
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer group relative">
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-red-900 opacity-0 group-hover:opacity-100 font-bold">✕</span>
          </button>
          <button onClick={onMinimize} className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors cursor-pointer group relative">
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-yellow-900 opacity-0 group-hover:opacity-100 font-bold">−</span>
          </button>
          <button onClick={onMaximize} className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors cursor-pointer group relative">
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-green-900 opacity-0 group-hover:opacity-100 font-bold">⤢</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-os-green/50" />
          <span className="font-mono text-[11px] text-os-muted tracking-wide">{title}.exe</span>
          <span className="font-mono text-[10px] text-os-muted/40">— Omar OS</span>
        </div>
        <div className="w-16" />
      </div>
      {/* Cyan top glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-os-cyan/30 to-transparent" />
      {/* Content */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        {children}
      </div>
    </motion.div>
  );

  if (isMobile || isMaximized) {
    return <AnimatePresence>{content}</AnimatePresence>;
  }

  return (
    <AnimatePresence>
      <Draggable
        handle=".handle"
        nodeRef={nodeRef}
        defaultPosition={defaultPosition || { x: 100 + Math.random() * 100, y: 50 + Math.random() * 50 }}
        bounds="parent"
      >
        {content}
      </Draggable>
    </AnimatePresence>
  );
};

export default OSWindow;
