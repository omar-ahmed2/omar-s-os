import { motion } from 'framer-motion';

interface DesktopHeroProps {
  onOpen: (id: string) => void;
}

const stats = [
  { label: 'Projects',   value: '3+',   color: '#00d4ff', glow: 'rgba(0,212,255,0.3)' },
  { label: 'Skills',     value: '11+',  color: '#00ff88', glow: 'rgba(0,255,136,0.3)' },
  { label: 'Experience', value: '1yr+', color: '#ffb800', glow: 'rgba(255,184,0,0.3)' },
];

const quickLinks = [
  { id: 'projects', label: '▸ Projects', color: '#00d4ff', border: 'rgba(0,212,255,0.25)', bg: 'rgba(0,212,255,0.07)' },
  { id: 'contact',  label: '▸ Contact',  color: '#00ff88', border: 'rgba(0,255,136,0.25)', bg: 'rgba(0,255,136,0.07)' },
  { id: 'terminal', label: '>_ Terminal', color: '#ffb800', border: 'rgba(255,184,0,0.25)', bg: 'rgba(255,184,0,0.07)' },
];

const DesktopHero = ({ onOpen }: DesktopHeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto"
      style={{ maxWidth: 460 }}
    >
      {/* Glass card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(5, 12, 24, 0.75)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid rgba(0,212,255,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,212,255,0.08)',
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center gap-2 px-5 py-2.5"
          style={{ background: 'rgba(3,8,18,0.6)', borderBottom: '1px solid rgba(0,212,255,0.07)' }}
        >
          <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <div className="w-2 h-2 rounded-full bg-[#28c840]" />
          <span className="font-mono text-[9px] text-os-cyan/30 tracking-widest ml-2">omar-os://welcome</span>
          <div className="ml-auto flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-os-green"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ boxShadow: '0 0 6px rgba(0,255,136,0.6)' }}
            />
            <span className="font-mono text-[8px] text-os-green/50">LIVE</span>
          </div>
        </div>

        {/* Cyan gradient line */}
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.35), transparent)' }} />

        {/* Hero content */}
        <div className="px-6 py-6">
          {/* Name area */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[9px] text-os-cyan/40 tracking-[0.2em] uppercase">whoami</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(0,212,255,0.1)' }} />
            </div>
            <motion.h1
              className="font-heading text-4xl font-bold tracking-tight"
              style={{ color: '#d8ecff', letterSpacing: '-0.01em' }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              Omar Ahmed
            </motion.h1>
            <motion.div
              className="flex items-center gap-2 mt-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <span
                className="font-mono text-sm font-medium"
                style={{ color: '#00d4ff', textShadow: '0 0 20px rgba(0,212,255,0.4)' }}
              >
                Frontend Developer
              </span>
              <span className="font-mono text-os-muted/30 text-sm">/</span>
              <span className="font-mono text-xs text-os-muted/60">Cairo, Egypt</span>
            </motion.div>
          </div>

          {/* Bio */}
          <motion.p
            className="font-mono text-[11px] text-os-text/50 leading-relaxed mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            Building fast, responsive web experiences with{' '}
            <span className="text-os-cyan/70">React</span>,{' '}
            <span className="text-os-cyan/70">TypeScript</span> &amp;{' '}
            <span className="text-os-cyan/70">modern tooling</span>.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-3 gap-2 mb-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                className="text-center py-2.5 rounded-xl"
                style={{
                  background: `${s.glow.replace('0.3', '0.05')}`,
                  border: `1px solid ${s.glow.replace('0.3', '0.2')}`,
                }}
                whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${s.glow}` }}
              >
                <p className="font-heading text-xl font-bold" style={{ color: s.color, textShadow: `0 0 16px ${s.glow}` }}>
                  {s.value}
                </p>
                <p className="font-mono text-[8px] text-os-muted/50 tracking-widest uppercase mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick launch buttons */}
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            {quickLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => onOpen(link.id)}
                className="flex-1 font-mono text-[10px] py-2 rounded-lg tracking-wider transition-all cursor-pointer"
                style={{
                  color: link.color,
                  background: link.bg,
                  border: `1px solid ${link.border}`,
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 0 16px ${link.border}`,
                  y: -2,
                }}
                whileTap={{ scale: 0.97 }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Bottom hint */}
        <div
          className="flex items-center justify-between px-5 py-2"
          style={{ background: 'rgba(3,8,18,0.4)', borderTop: '1px solid rgba(0,212,255,0.05)' }}
        >
          <span className="font-mono text-[8px] text-os-muted/30">Select apps to launch · Neural interface active</span>
          <span className="font-mono text-[8px] text-os-cyan/25">⌥1–5</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DesktopHero;
