import { motion } from 'framer-motion';

interface AppLauncherProps {
  onOpen: (id: string) => void;
}

const apps = [
  {
    id: 'about',
    icon: '📁',
    label: 'About Me',
    desc: 'Identity & bio',
    shortcut: '⌥1',
    color: '#00d4ff',
    border: 'rgba(0,212,255,0.22)',
    glow:   'rgba(0,212,255,0.12)',
    bg:     'rgba(0,212,255,0.05)',
    stripe: '#00d4ff',
  },
  {
    id: 'projects',
    icon: '💼',
    label: 'Projects',
    desc: '3 live repos',
    shortcut: '⌥2',
    color: '#ffb800',
    border: 'rgba(255,184,0,0.22)',
    glow:   'rgba(255,184,0,0.12)',
    bg:     'rgba(255,184,0,0.05)',
    stripe: '#ffb800',
  },
  {
    id: 'skills',
    icon: '⚡',
    label: 'Skills',
    desc: '11 technologies',
    shortcut: '⌥3',
    color: '#00ff88',
    border: 'rgba(0,255,136,0.22)',
    glow:   'rgba(0,255,136,0.12)',
    bg:     'rgba(0,255,136,0.05)',
    stripe: '#00ff88',
  },
  {
    id: 'experience',
    icon: '🏢',
    label: 'Experience',
    desc: 'Work history',
    shortcut: '⌥4',
    color: '#00d4ff',
    border: 'rgba(0,212,255,0.22)',
    glow:   'rgba(0,212,255,0.12)',
    bg:     'rgba(0,212,255,0.05)',
    stripe: '#00d4ff',
  },
  {
    id: 'contact',
    icon: '📬',
    label: 'Contact',
    desc: 'Let\'s talk',
    shortcut: '⌥5',
    color: '#ffb800',
    border: 'rgba(255,184,0,0.22)',
    glow:   'rgba(255,184,0,0.12)',
    bg:     'rgba(255,184,0,0.05)',
    stripe: '#ffb800',
  },
  {
    id: 'terminal',
    icon: '>_',
    label: 'Terminal',
    desc: 'Interactive CLI',
    shortcut: '⌥T',
    color: '#00ff88',
    border: 'rgba(0,255,136,0.22)',
    glow:   'rgba(0,255,136,0.12)',
    bg:     'rgba(0,255,136,0.05)',
    stripe: '#00ff88',
  },
];

const AppLauncher = ({ onOpen }: AppLauncherProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-2 shrink-0"
      style={{ width: 210 }}
    >
      {/* Header label */}
      <div className="flex items-center gap-2 px-1 mb-1">
        <div className="h-px flex-1" style={{ background: 'rgba(0,212,255,0.12)' }} />
        <span className="font-mono text-[8px] tracking-[0.2em] text-os-cyan/30 uppercase">Applications</span>
        <div className="h-px flex-1" style={{ background: 'rgba(0,212,255,0.12)' }} />
      </div>

      {apps.map((app, i) => (
        <motion.button
          key={app.id}
          initial={{ opacity: 0, x: -20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.35 + i * 0.07, type: 'spring', stiffness: 300, damping: 24 }}
          onClick={() => onOpen(app.id)}
          className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-left overflow-hidden group cursor-pointer"
          style={{
            background: 'rgba(5, 12, 24, 0.65)',
            border: `1px solid rgba(0,212,255,0.08)`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          whileHover={{
            scale: 1.02,
            x: 4,
            background: app.bg,
            borderColor: app.border,
            boxShadow: `0 0 24px ${app.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
            transition: { duration: 0.15 },
          }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Left color stripe */}
          <div
            className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: app.stripe, boxShadow: `0 0 8px ${app.stripe}` }}
          />

          {/* Shimmer on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{ background: `linear-gradient(105deg, transparent 40%, ${app.glow} 50%, transparent 60%)` }}
            initial={false}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
          />

          {/* Icon */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
            style={{
              background: `${app.glow}`,
              border: `1px solid ${app.border}`,
            }}
          >
            {app.icon === '>_' ? (
              <span className="font-mono font-bold text-sm" style={{ color: app.color }}>
                &gt;_
              </span>
            ) : (
              <span className="text-xl">{app.icon}</span>
            )}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p
              className="font-mono text-[11px] font-medium leading-tight transition-colors duration-150 group-hover:text-white"
              style={{ color: 'rgba(200,225,255,0.75)' }}
            >
              {app.label}
            </p>
            <p className="font-mono text-[9px] mt-0.5 transition-colors duration-150"
              style={{ color: 'rgba(100,140,180,0.55)' }}>
              {app.desc}
            </p>
          </div>

          {/* Shortcut badge */}
          <span
            className="font-mono text-[8px] px-1.5 py-0.5 rounded shrink-0 opacity-40 group-hover:opacity-80 transition-opacity"
            style={{
              color: app.color,
              background: app.bg,
              border: `1px solid ${app.border}`,
            }}
          >
            {app.shortcut}
          </span>
        </motion.button>
      ))}

      {/* Bottom status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="flex items-center gap-2 px-2 mt-1"
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-os-green"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ boxShadow: '0 0 6px rgba(0,255,136,0.6)' }}
        />
        <span className="font-mono text-[8px] text-os-muted/40">6 apps available</span>
        <div className="flex-1 h-px" style={{ background: 'rgba(0,212,255,0.07)' }} />
      </motion.div>
    </motion.div>
  );
};

export default AppLauncher;
