import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
  delay?: number;
  shortcut?: string;
}

const iconColors: Record<string, { border: string; glow: string; bg: string; text: string; glowShadow: string }> = {
  '📁': { border: 'rgba(0,212,255,0.3)',  glow: '0 0 24px rgba(0,212,255,0.4)',  bg: 'rgba(0,212,255,0.09)',  text: '#00d4ff', glowShadow: 'rgba(0,212,255,0.35)' },
  '💼': { border: 'rgba(255,184,0,0.3)',  glow: '0 0 24px rgba(255,184,0,0.4)',  bg: 'rgba(255,184,0,0.09)',  text: '#ffb800', glowShadow: 'rgba(255,184,0,0.35)' },
  '⚡': { border: 'rgba(0,255,136,0.3)',  glow: '0 0 24px rgba(0,255,136,0.4)',  bg: 'rgba(0,255,136,0.09)',  text: '#00ff88', glowShadow: 'rgba(0,255,136,0.35)' },
  '🏢': { border: 'rgba(0,212,255,0.3)',  glow: '0 0 24px rgba(0,212,255,0.4)',  bg: 'rgba(0,212,255,0.09)',  text: '#00d4ff', glowShadow: 'rgba(0,212,255,0.35)' },
  '📬': { border: 'rgba(255,184,0,0.3)',  glow: '0 0 24px rgba(255,184,0,0.4)',  bg: 'rgba(255,184,0,0.09)',  text: '#ffb800', glowShadow: 'rgba(255,184,0,0.35)' },
  '>_': { border: 'rgba(0,255,136,0.3)',  glow: '0 0 24px rgba(0,255,136,0.4)',  bg: 'rgba(0,255,136,0.09)',  text: '#00ff88', glowShadow: 'rgba(0,255,136,0.35)' },
};

const defaultColor = {
  border: 'rgba(0,212,255,0.2)', glow: '0 0 20px rgba(0,212,255,0.25)',
  bg: 'rgba(0,212,255,0.05)',    text: '#00d4ff',                       glowShadow: 'rgba(0,212,255,0.3)',
};

const shortLabels: Record<string, string> = {
  'about.exe':      'About',
  'projects.exe':   'Projects',
  'skills.exe':     'Skills',
  'experience.exe': 'Experience',
  'contact.exe':    'Contact',
  'terminal.exe':   'Terminal',
};

const DesktopIcon = ({ icon, label, onClick, delay = 0 }: DesktopIconProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout>>();
  const colors = iconColors[icon] || defaultColor;
  const displayLabel = shortLabels[label] || label;

  const handleClick = () => {
    setIsSelected(true);
    const newCount = clickCount + 1;
    setClickCount(newCount);

    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      if (newCount >= 2) onClick();
      setClickCount(0);
      setIsSelected(false);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 320, damping: 22 }}
      className="flex flex-col items-center gap-2 cursor-pointer group select-none"
      style={{ width: 80 }}
      onClick={handleClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.93 }}
    >
      {/* Icon Box */}
      <motion.div
        className="relative w-[68px] h-[68px] rounded-2xl flex items-center justify-center transition-all duration-200"
        style={{
          background: isSelected ? colors.bg : 'rgba(5, 12, 24, 0.6)',
          border: `1px solid ${isSelected ? colors.border : 'rgba(0,212,255,0.1)'}`,
          boxShadow: isSelected ? colors.glow : 'none',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
        whileHover={{
          background: colors.bg,
          borderColor: colors.border,
          boxShadow: colors.glow,
          transition: { duration: 0.15 }
        }}
        animate={isSelected ? { scale: [1, 0.92, 1.04, 1] } : {}}
        transition={{ duration: 0.28 }}
      >
        {/* Inner glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at 35% 35%, ${colors.bg}, transparent 65%)` }}
        />

        {/* Icon */}
        {icon === '>_' ? (
          <span
            className="font-mono font-bold text-2xl relative z-10 transition-transform duration-150 group-hover:scale-110"
            style={{ color: colors.text, textShadow: `0 0 12px ${colors.glowShadow}` }}
          >
            &gt;_
          </span>
        ) : (
          <motion.span
            className="text-[2.2rem] relative z-10"
            whileHover={{ scale: 1.15, rotate: [-2, 2, -1, 0] }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.span>
        )}

        {/* Bottom active dot */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: colors.text, boxShadow: colors.glow }}
          />
        )}
      </motion.div>

      {/* Label */}
      <motion.div
        className="font-mono text-[10px] tracking-wide text-center leading-tight px-2 py-0.5 rounded-md transition-all duration-200"
        style={{
          color: isSelected ? colors.text : 'rgba(180,210,240,0.65)',
          background: isSelected ? `${colors.bg}` : 'rgba(3,8,18,0.55)',
          border: `1px solid ${isSelected ? colors.border : 'transparent'}`,
          textShadow: isSelected ? `0 0 12px ${colors.glowShadow}` : 'none',
          backdropFilter: 'blur(8px)',
        }}
      >
        {displayLabel}
      </motion.div>
    </motion.div>
  );
};

export default DesktopIcon;
