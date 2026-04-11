import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContextMenuProps {
  x: number;
  y: number;
  visible: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
  onDownloadCV: () => void;
}

const menuItems = [
  { divider: false, icon: '>_', label: 'Open Terminal', action: 'terminal', color: 'text-os-cyan' },
  { divider: false, icon: '📁', label: 'About Me', action: 'about', color: 'text-os-text' },
  { divider: false, icon: '💼', label: 'View Projects', action: 'projects', color: 'text-os-text' },
  { divider: false, icon: '⚡', label: 'My Skills', action: 'skills', color: 'text-os-text' },
  { divider: false, icon: '🏢', label: 'Experience', action: 'experience', color: 'text-os-text' },
  { divider: false, icon: '📬', label: 'Contact Me', action: 'contact', color: 'text-os-text' },
  { divider: true, icon: '', label: '', action: '', color: '' },
  { divider: false, icon: '📥', label: 'Download CV', action: 'cv', color: 'text-os-green' },
];

const DesktopContextMenu = ({ x, y, visible, onClose, onOpen, onDownloadCV }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = () => onClose();
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (visible) {
      document.addEventListener('click', handleClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, onClose]);

  // Constrain menu to viewport
  const adjustedX = Math.min(x, window.innerWidth - 200);
  const adjustedY = Math.min(y, window.innerHeight - 280);

  const handleAction = (item: typeof menuItems[0]) => {
    if (item.action === 'cv') {
      onDownloadCV();
    } else if (item.action) {
      onOpen(item.action);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.9, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -8 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
          className="fixed z-[200] pointer-events-auto"
          style={{ left: adjustedX, top: adjustedY }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="rounded-t-lg px-3 py-1.5 border-b border-os-cyan/8"
            style={{ background: 'rgba(3, 8, 18, 0.98)', border: '1px solid rgba(0,212,255,0.12)', borderBottom: '1px solid rgba(0,212,255,0.06)' }}
          >
            <span className="font-mono text-[8px] text-os-cyan/40 tracking-widest uppercase">omar-os://desktop</span>
          </div>

          {/* Items */}
          <div
            className="rounded-b-lg py-1 min-w-[180px]"
            style={{
              background: 'rgba(5, 12, 22, 0.97)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(0,212,255,0.12)',
              borderTop: 'none',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,212,255,0.06)',
            }}
          >
            {menuItems.map((item, i) =>
              item.divider ? (
                <div key={i} className="mx-3 my-1 h-px" style={{ background: 'rgba(0,212,255,0.07)' }} />
              ) : (
                <button
                  key={i}
                  onClick={() => handleAction(item)}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 font-mono text-[11px] ${item.color} hover:bg-os-cyan/8 hover:text-os-cyan transition-all duration-100 cursor-pointer group`}
                >
                  <span className="text-sm w-4 text-center shrink-0">{item.icon}</span>
                  <span className="tracking-wide group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                  {item.action === 'terminal' && (
                    <span className="ml-auto text-[8px] text-os-cyan/20 font-mono">Ctrl+T</span>
                  )}
                </button>
              )
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DesktopContextMenu;
