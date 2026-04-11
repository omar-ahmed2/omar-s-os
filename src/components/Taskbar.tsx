import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TaskbarProps {
  openWindows: string[];
  activeWindow: string | null;
  onWindowClick: (id: string) => void;
}

const windowIcons: Record<string, string> = {
  about: '📁',
  projects: '💼',
  skills: '⚡',
  experience: '🏢',
  contact: '📬',
  terminal: '>_',
};

const Taskbar = ({ openWindows, activeWindow, onWindowClick }: TaskbarProps) => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] h-12 flex items-center justify-between px-3 border-t border-os-cyan/10"
      style={{ background: 'rgba(5, 10, 14, 0.95)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
    >
      {/* Left: Logo + Window buttons */}
      <div className="flex items-center gap-1">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 mr-2 rounded cursor-pointer hover:bg-os-cyan/5 transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-2 h-2 rounded-full bg-os-cyan animate-pulse" style={{ boxShadow: '0 0 8px rgba(0,212,255,0.6)' }} />
          <span className="font-mono text-xs font-bold text-os-cyan tracking-wider">OMAR OS</span>
        </motion.div>

        {/* Separator */}
        <div className="w-px h-5 bg-os-cyan/10 mr-1" />

        {/* Open windows */}
        {openWindows.map(id => (
          <motion.button
            key={id}
            onClick={() => onWindowClick(id)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={`font-mono text-[11px] px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
              activeWindow === id
                ? 'bg-os-cyan/10 text-os-cyan border border-os-cyan/25'
                : 'text-os-muted hover:text-os-text hover:bg-os-cyan/5 border border-transparent'
            }`}
          >
            <span className="text-xs">{windowIcons[id] || '◻'}</span>
            {id}
            {activeWindow === id && (
              <motion.div
                layoutId="taskbar-indicator"
                className="absolute -bottom-px left-1/2 -translate-x-1/2 w-4 h-0.5 bg-os-cyan rounded-full"
                style={{ boxShadow: '0 0 6px rgba(0,212,255,0.5)' }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Right: System tray */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-os-green" style={{ boxShadow: '0 0 4px rgba(0,255,136,0.5)' }} />
          <span className="font-mono text-[10px] text-os-muted">ONLINE</span>
        </div>
        <div className="w-px h-4 bg-os-cyan/10" />
        <span className="font-mono text-[10px] text-os-muted">📡 Cairo, EG</span>
        <div className="w-px h-4 bg-os-cyan/10" />
        <div className="text-right">
          <span className="font-mono text-[11px] text-os-cyan font-medium">{time}</span>
          <span className="font-mono text-[10px] text-os-muted ml-2">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
