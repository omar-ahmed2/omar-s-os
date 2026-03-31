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
    ? { position: 'fixed' as const, inset: isMobile ? '0 0 48px 0' : '0 0 44px 0', width: '100%', height: isMobile ? 'calc(100% - 48px)' : 'calc(100% - 44px)' }
    : { width: defaultSize?.width || 700, height: defaultSize?.height || 500 };

  const content = (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      ref={nodeRef}
      className="glass rounded-lg overflow-hidden flex flex-col shadow-2xl pointer-events-auto"
      style={{ ...windowStyle, zIndex, willChange: 'transform' }}
      onMouseDown={handleMouseDown}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-os-cyan/10 bg-os-surface/80 cursor-move select-none handle">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
          <button onClick={onMinimize} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
          <button onClick={onMaximize} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
        </div>
        <span className="font-mono text-xs text-os-muted">{title}.exe — Omar OS</span>
        <div className="w-16" />
      </div>
      {/* Cyan top glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-os-cyan/50 to-transparent" />
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
