import { useRef, useCallback, useState, useEffect } from 'react';
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

// Stable PID per window id — generated once, never changes
const pidMap: Record<string, number> = {};
const getPID = (id: string) => {
  if (!pidMap[id]) pidMap[id] = Math.floor(Math.random() * 9000 + 1000);
  return pidMap[id];
};

const windowTitles: Record<string, string> = {
  about: 'About Me',
  projects: 'Projects',
  skills: 'Skills',
  experience: 'Experience',
  contact: 'Contact',
  terminal: 'Terminal',
};

const OSWindow = ({
  id, title, isOpen, isMinimized, zIndex, onClose, onMinimize, onMaximize,
  onFocus, isMaximized, children, defaultPosition, defaultSize
}: WindowProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pid = getPID(id);

  const handleMouseDown = useCallback(() => onFocus(), [onFocus]);

  // Simulate brief loading when window opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setIsLoading(true);
      const t = setTimeout(() => setIsLoading(false), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

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
        background: 'rgba(6, 14, 28, 0.93)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(0, 212, 255, 0.09)',
        boxShadow: isDragging
          ? '0 40px 90px -20px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 212, 255, 0.1)'
          : '0 20px 55px -15px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 212, 255, 0.1)',
        ...(isFullscreen ? { position: 'fixed' as const, inset: '0 0 48px 0' } : {}),
      }}
      onMouseDown={handleMouseDown}
    >
      {/* ═══ TITLE BAR ═══ */}
      <div
        className="flex items-center justify-between px-3 py-2 select-none handle cursor-grab active:cursor-grabbing shrink-0 relative"
        style={{ background: 'rgba(3, 8, 18, 0.85)', borderBottom: '1px solid rgba(0, 212, 255, 0.07)' }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff7b72] transition-all cursor-pointer group relative hover:shadow-[0_0_8px_rgba(255,95,87,0.6)]"
          >
            <span className="absolute inset-0 flex items-center justify-center text-[7px] text-[#4a0000] opacity-0 group-hover:opacity-100 font-bold">✕</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#ffd060] transition-all cursor-pointer group relative hover:shadow-[0_0_8px_rgba(254,188,46,0.6)]"
          >
            <span className="absolute inset-0 flex items-center justify-center text-[7px] text-[#4a3500] opacity-0 group-hover:opacity-100 font-bold">−</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#5bd969] transition-all cursor-pointer group relative hover:shadow-[0_0_8px_rgba(40,200,64,0.6)]"
          >
            <span className="absolute inset-0 flex items-center justify-center text-[7px] text-[#003a00] opacity-0 group-hover:opacity-100 font-bold">⤢</span>
          </button>
        </div>

        {/* Title center */}
        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-os-green"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ boxShadow: '0 0 6px rgba(0,255,136,0.5)' }}
          />
          <span className="font-mono text-[10px] text-os-muted/80 tracking-widest uppercase">
            {windowTitles[title] || title}.exe
          </span>
        </div>

        {/* Right side: PID */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[8px] text-os-muted/30">PID:{pid}</span>
        </div>
      </div>

      {/* ═══ CYAN GLOW LINE ═══ */}
      <div className="h-px shrink-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)' }} />

      {/* ═══ STATUS BAR ═══ */}
      <div
        className="flex items-center gap-3 px-3 py-1 shrink-0"
        style={{ background: 'rgba(3, 8, 18, 0.4)', borderBottom: '1px solid rgba(0, 212, 255, 0.04)' }}
      >
        <span className="font-mono text-[8px] text-os-cyan/40">▸ /{title}</span>
        <span className="font-mono text-[8px] text-os-muted/30">|</span>
        <motion.span
          className="font-mono text-[8px] text-os-green/50"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ● active
        </motion.span>
        <div className="flex-1" />
        <span className="font-mono text-[8px] text-os-muted/30">omar@os:~</span>
      </div>

      {/* ═══ CONTENT / LOADING ═══ */}
      <div className="flex-1 overflow-auto p-4 md:p-5 min-h-0 relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2 font-mono text-[10px] text-os-muted/60 h-full justify-start pt-2"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0 }}
                className="flex items-center gap-2"
              >
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                  className="text-os-cyan"
                >▸</motion.span>
                <span className="text-os-cyan/50">INIT loading {title}.exe...</span>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }} className="text-os-muted/40">
                PROC mounting data sources...
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24 }} className="text-os-green/40">
                OK   process started — PID:{pid}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══ BOTTOM STATUS ═══ */}
      <div
        className="flex items-center px-3 py-1 shrink-0"
        style={{ background: 'rgba(3, 8, 18, 0.5)', borderTop: '1px solid rgba(0, 212, 255, 0.04)' }}
      >
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
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
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
            initial={{ scale: 0.82, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.87, opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          >
            {innerContent}
          </motion.div>
        </div>
      </Draggable>
    </AnimatePresence>
  );
};

export default OSWindow;
