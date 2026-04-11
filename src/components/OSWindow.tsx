import { useRef, useCallback, useState } from 'react';
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
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => onFocus(), [onFocus]);

  if (!isOpen) return null;
  if (isMinimized) return null;

  const isFullscreen = isMaximized || isMobile;

  const windowSize = isFullscreen
    ? { width: '100%', height: 'calc(100% - 48px)' }
    : { width: defaultSize?.width || 700, height: defaultSize?.height || 500 };

  const innerContent = (
    <div
      className={`flex flex-col overflow-hidden pointer-events-auto ${isFullscreen ? '' : 'rounded-xl'}`}
      style={{
        ...windowSize,
        zIndex,
        willChange: 'transform',
        background: 'rgba(6, 14, 28, 0.92)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1px solid rgba(0, 212, 255, 0.07)',
        boxShadow: isDragging
          ? '0 35px 80px -20px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 212, 255, 0.08)'
          : '0 20px 50px -15px rgba(0, 0, 0, 0.5), 0 0 1px rgba(0, 212, 255, 0.08)',
        ...(isFullscreen ? { position: 'fixed' as const, inset: '0 0 48px 0' } : {}),
      }}
      onMouseDown={handleMouseDown}
    >
      {/* ═══ TITLE BAR ═══ */}
      <div
        className="flex items-center justify-between px-3 py-2 select-none handle cursor-grab active:cursor-grabbing shrink-0"
        style={{ background: 'rgba(3, 8, 18, 0.8)', borderBottom: '1px solid rgba(0, 212, 255, 0.06)' }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff7b72] transition-colors cursor-pointer group relative">
            <span className="absolute inset-0 flex items-center justify-center text-[7px] text-[#4a0000] opacity-0 group-hover:opacity-100 font-bold">✕</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#ffd060] transition-colors cursor-pointer group relative">
            <span className="absolute inset-0 flex items-center justify-center text-[7px] text-[#4a3500] opacity-0 group-hover:opacity-100 font-bold">−</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); onMaximize(); }} className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#5bd969] transition-colors cursor-pointer group relative">
            <span className="absolute inset-0 flex items-center justify-center text-[7px] text-[#003a00] opacity-0 group-hover:opacity-100 font-bold">⤢</span>
          </button>
        </div>

        {/* Title center */}
        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <div className="w-1.5 h-1.5 rounded-full bg-os-green/60 animate-pulse" />
          <span className="font-mono text-[10px] text-os-muted/70 tracking-widest uppercase">{title}.exe</span>
        </div>

        {/* Right side decorations */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[8px] text-os-muted/30">PID:{Math.floor(Math.random() * 9000 + 1000)}</span>
        </div>
      </div>

      {/* ═══ CYAN GLOW LINE ═══ */}
      <div className="h-px shrink-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.25), transparent)' }} />

      {/* ═══ STATUS BAR ═══ */}
      <div className="flex items-center gap-3 px-3 py-1 shrink-0" style={{ background: 'rgba(3, 8, 18, 0.4)', borderBottom: '1px solid rgba(0, 212, 255, 0.04)' }}>
        <span className="font-mono text-[8px] text-os-cyan/40">▸ /{title}</span>
        <span className="font-mono text-[8px] text-os-muted/30">|</span>
        <span className="font-mono text-[8px] text-os-green/40">● active</span>
        <div className="flex-1" />
        <span className="font-mono text-[8px] text-os-muted/30">omar@os:~</span>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="flex-1 overflow-auto p-4 md:p-5 min-h-0">
        {children}
      </div>

      {/* ═══ BOTTOM STATUS ═══ */}
      <div className="flex items-center px-3 py-1 shrink-0" style={{ background: 'rgba(3, 8, 18, 0.5)', borderTop: '1px solid rgba(0, 212, 255, 0.04)' }}>
        <span className="font-mono text-[8px] text-os-cyan/30">OMAR OS v2.0</span>
        <div className="flex-1" />
        <span className="font-mono text-[8px] text-os-muted/30">UTF-8</span>
        <span className="font-mono text-[8px] text-os-muted/20 ml-3">LF</span>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <AnimatePresence>
        <motion.div
          key={`${id}-fullscreen`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {innerContent}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <Draggable
        handle=".handle"
        nodeRef={nodeRef}
        defaultPosition={defaultPosition || { x: 120, y: 60 }}
        onStart={() => { setIsDragging(true); onFocus(); }}
        onStop={() => setIsDragging(false)}
      >
        <div
          ref={nodeRef}
          className="absolute pointer-events-auto"
          style={{ zIndex }}
        >
          <motion.div
            key={`${id}-windowed`}
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {innerContent}
          </motion.div>
        </div>
      </Draggable>
    </AnimatePresence>
  );
};

export default OSWindow;
