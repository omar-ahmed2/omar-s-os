import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskbarProps {
  openWindows: string[];
  activeWindow: string | null;
  onWindowClick: (id: string) => void;
}

const windowMeta: Record<string, { icon: string; label: string; shortcut: string }> = {
  about:      { icon: '📁', label: 'About',      shortcut: '1' },
  projects:   { icon: '💼', label: 'Projects',   shortcut: '2' },
  skills:     { icon: '⚡', label: 'Skills',     shortcut: '3' },
  experience: { icon: '🏢', label: 'Experience', shortcut: '4' },
  contact:    { icon: '📬', label: 'Contact',    shortcut: '5' },
  terminal:   { icon: '>_', label: 'Terminal',   shortcut: 'T' },
};

const Taskbar = ({ openWindows, activeWindow, onWindowClick }: TaskbarProps) => {
  const [time, setTime]       = useState('');
  const [date, setDate]       = useState('');
  const [battery, setBattery] = useState(87);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  // Very slowly drain battery for authenticity 😄
  useEffect(() => {
    const iv = setInterval(() => {
      setBattery(b => b <= 10 ? 87 : b - 1);
    }, 120_000);
    return () => clearInterval(iv);
  }, []);

  const batteryColor =
    battery > 50 ? '#00ff88'
    : battery > 20 ? '#ffb800'
    : '#ff5f57';

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] h-12 flex items-center justify-between px-3 border-t"
      style={{
        background: 'rgba(4, 8, 16, 0.97)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderColor: 'rgba(0,212,255,0.09)',
      }}
    >
      {/* ── LEFT: Logo + open windows ── */}
      <div className="flex items-center gap-1">

        {/* Logo button */}
        <motion.button
          className="flex items-center gap-2 px-3 py-1.5 mr-1.5 rounded-lg cursor-pointer relative overflow-hidden group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowHints(h => !h)}
          style={{
            background: 'rgba(0,212,255,0.05)',
            border: '1px solid rgba(0,212,255,0.12)',
          }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.08), transparent)' }} />
          <motion.div
            className="w-2 h-2 rounded-full bg-os-cyan"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ boxShadow: '0 0 8px rgba(0,212,255,0.7)' }}
          />
          <span className="font-mono text-xs font-bold text-os-cyan tracking-wider">OMAR OS</span>
        </motion.button>

        {/* Separator */}
        <div className="w-px h-5 bg-os-cyan/10 mr-1" />

        {/* Open windows */}
        <AnimatePresence>
          {openWindows.map(id => {
            const meta = windowMeta[id] || { icon: '◻', label: id, shortcut: '' };
            const isActive = activeWindow === id;
            return (
              <motion.button
                key={id}
                layout
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -10 }}
                onClick={() => onWindowClick(id)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                className={`relative font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'text-os-cyan'
                    : 'text-os-muted hover:text-os-text'
                }`}
                style={{
                  background: isActive ? 'rgba(0,212,255,0.1)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(0,212,255,0.25)' : 'transparent'}`,
                  boxShadow: isActive ? '0 0 12px rgba(0,212,255,0.08)' : 'none',
                }}
              >
                <span className={`text-xs ${meta.icon === '>_' ? 'font-bold font-mono' : ''}`}>
                  {meta.icon}
                </span>
                <span>{meta.label}</span>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-bar"
                    className="absolute -bottom-px left-2 right-2 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)', boxShadow: '0 0 6px rgba(0,212,255,0.6)' }}
                  />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── CENTER: Keyboard hints (toggleable) ── */}
      <AnimatePresence>
        {showHints && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-14 flex items-center gap-1 px-3 py-2 rounded-lg pointer-events-none"
            style={{
              background: 'rgba(4,10,20,0.95)',
              border: '1px solid rgba(0,212,255,0.1)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 -8px 24px rgba(0,0,0,0.4)',
            }}
          >
            {Object.entries(windowMeta).map(([, meta]) => (
              <div key={meta.label} className="flex items-center gap-1 font-mono text-[9px]">
                <span
                  className="px-1.5 py-0.5 rounded text-os-cyan/70"
                  style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)' }}
                >
                  ⌥{meta.shortcut}
                </span>
                <span className="text-os-muted/50">{meta.label}</span>
                <span className="text-os-muted/20 ml-0.5">·</span>
              </div>
            ))}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
              style={{ background: 'rgba(4,10,20,0.95)', border: '1px solid rgba(0,212,255,0.1)', borderTop: 'none', borderLeft: 'none' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── RIGHT: System tray ── */}
      <div className="flex items-center gap-2.5">

        {/* Online badge */}
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-os-green"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ boxShadow: '0 0 6px rgba(0,255,136,0.6)' }}
          />
          <span className="font-mono text-[9px] text-os-muted/70 tracking-wider">ONLINE</span>
        </div>

        <div className="w-px h-4 bg-os-cyan/8" />

        {/* WiFi */}
        <div className="flex items-center gap-1" title="Connected">
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M6 8.5a1 1 0 100-2 1 1 0 000 2z" fill="rgba(0,212,255,0.6)" />
            <path d="M3.5 6.5C4.2 5.8 5.1 5.5 6 5.5s1.8.3 2.5 1" stroke="rgba(0,212,255,0.5)" strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M1.5 4.5C2.8 3.2 4.3 2.5 6 2.5s3.2.7 4.5 2" stroke="rgba(0,212,255,0.3)" strokeWidth="1" strokeLinecap="round" fill="none"/>
          </svg>
          <span className="font-mono text-[9px] text-os-muted/50">Cairo</span>
        </div>

        <div className="w-px h-4 bg-os-cyan/8" />

        {/* Battery */}
        <div className="flex items-center gap-1.5" title={`Battery: ${battery}%`}>
          <div className="relative flex items-center">
            <div
              className="w-6 h-3 rounded-sm relative overflow-hidden"
              style={{ border: `1px solid ${batteryColor}55` }}
            >
              <motion.div
                className="h-full rounded-sm"
                animate={{ width: `${battery}%` }}
                transition={{ duration: 1 }}
                style={{ background: batteryColor, opacity: 0.7 }}
              />
            </div>
            <div className="w-0.5 h-1.5 rounded-r-sm ml-px" style={{ background: `${batteryColor}55` }} />
          </div>
          <span className="font-mono text-[9px]" style={{ color: batteryColor + 'aa' }}>{battery}%</span>
        </div>

        <div className="w-px h-4 bg-os-cyan/8" />

        {/* Clock */}
        <div className="text-right">
          <span className="font-mono text-[11px] text-os-cyan font-medium">{time}</span>
          <span className="font-mono text-[9px] text-os-muted/60 ml-1.5">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
