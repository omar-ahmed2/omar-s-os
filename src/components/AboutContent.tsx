import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const useTypewriter = (text: string, speed = 18, startDelay = 0) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
};

const TypewriterLine = ({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) => {
  const { displayed, done } = useTypewriter(text, 15, delay);
  return (
    <span className={className}>
      {displayed}
      {!done && <span className="text-os-cyan animate-pulse">█</span>}
    </span>
  );
};

// Glitch text component
const GlitchText = ({ text, className = '' }: { text: string; className?: string }) => {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    // Random periodic glitch
    const schedule = () => {
      const t = setTimeout(() => {
        setGlitching(true);
        setTimeout(() => { setGlitching(false); schedule(); }, 200);
      }, 3000 + Math.random() * 5000);
      return t;
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className={`relative z-10 ${glitching ? 'glitch-text' : ''}`}>{text}</span>
      {/* Glitch layers */}
      {glitching && (
        <>
          <span
            className="absolute inset-0 z-0 text-os-cyan"
            style={{ clipPath: 'inset(30% 0 40% 0)', transform: 'translateX(-3px)', opacity: 0.7 }}
            aria-hidden
          >
            {text}
          </span>
          <span
            className="absolute inset-0 z-0 text-[#ff00aa]"
            style={{ clipPath: 'inset(55% 0 10% 0)', transform: 'translateX(3px)', opacity: 0.7 }}
            aria-hidden
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
};

const AboutContent = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 800),
      setTimeout(() => setStep(3), 2200),
      setTimeout(() => setStep(4), 3500),
      setTimeout(() => setStep(5), 4800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="font-mono text-sm space-y-2">
      {/* Command line */}
      <div className="flex items-center gap-1.5">
        <span className="text-os-cyan text-[10px]">omar@os</span>
        <span className="text-os-muted text-[10px]">:</span>
        <span className="text-os-cyan text-[10px]">~/about</span>
        <span className="text-os-text text-[10px]">$</span>
        <TypewriterLine text=" whoami" delay={100} className="text-os-text/70 text-[10px]" />
      </div>

      {step >= 1 && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="sm:pl-1">
          {/* Main Info Header with Photo */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start mb-4">
            {/* Photo Frame */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative shrink-0 group"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-os-cyan/30 p-1 bg-os-cyan/5 relative z-10">
                <img 
                  src="/omar-photo.jpg" 
                  alt="Omar Ahmed" 
                  className="w-full h-full object-cover rounded-lg filter grayscale hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    // Fallback if image not found
                    (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Omar';
                  }}
                />
              </div>
              {/* Decorative side accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-os-cyan z-20" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-os-cyan z-20" />
              <div className="absolute -inset-2 bg-os-cyan/5 blur-xl -z-10 group-hover:bg-os-cyan/10 transition-colors" />
            </motion.div>

            <div className="flex-1 text-center sm:text-left space-y-1.5 pt-1">
              {/* Glitch name */}
              <GlitchText
                text="OMAR AHMED"
                className="text-2xl font-heading font-bold text-os-text tracking-wide block"
              />
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-os-green"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.4, 1],
                    boxShadow: [
                      '0 0 6px rgba(0,255,136,0.4)',
                      '0 0-16px rgba(0,255,136,0.9)',
                      '0 0 6px rgba(0,255,136,0.4)'
                    ]
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <p className="text-os-cyan text-xs">Frontend Developer &amp; CS Engineering Student</p>
              </div>
            </div>
          </div>

          <div className="text-os-cyan/10 text-[10px] my-3 select-none">────────────────────────────────────────────────</div>

          {/* System info block */}
          <div className="mt-2 rounded-lg border border-os-cyan/10 p-3" style={{ background: 'rgba(0,212,255,0.02)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-[10px]">
              {[
                { key: 'Location:', val: 'Cairo, Egypt 📍', color: 'text-os-text/80' },
                { key: 'Phone:', val: '01025891909', color: 'text-os-text/80' },
                { key: 'Email:', val: 'omarahmedt2460@gmail.com', color: 'text-os-cyan' },
                { key: 'Status:', val: '● Available for hire', color: 'text-os-green' },
              ].map(({ key, val, color }) => (
                <div key={key} className="flex gap-2">
                  <span className="text-os-muted shrink-0 w-16">{key}</span>
                  <span className={`${color} truncate`}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {step >= 2 && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-os-cyan text-[10px]">omar@os</span>
            <span className="text-os-muted text-[10px]">:</span>
            <span className="text-os-cyan text-[10px]">~</span>
            <span className="text-os-text text-[10px]">$</span>
            <TypewriterLine text=" cat bio.txt" delay={0} className="text-os-text/70 text-[10px]" />
          </div>
          <div className="rounded-lg border border-os-cyan/8 p-3 mt-1" style={{ background: 'rgba(0,212,255,0.015)' }}>
            <p className="text-os-text/70 leading-relaxed text-xs">
              Experienced Front-End Developer skilled in{' '}
              <span className="text-os-cyan">React.js</span>,{' '}
              <span className="text-os-cyan">Redux</span>, and API integration.
              Building fast, responsive, user-focused web apps with clean, maintainable code.
              Passionate about UI/UX, performance, and delivering seamless digital experiences.
            </p>
          </div>
        </motion.div>
      )}

      {step >= 3 && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-os-cyan text-[10px]">omar@os</span>
            <span className="text-os-muted text-[10px]">:</span>
            <span className="text-os-cyan text-[10px]">~</span>
            <span className="text-os-text text-[10px]">$</span>
            <TypewriterLine text=" ls awards/" delay={0} className="text-os-text/70 text-[10px]" />
          </div>
          <div className="space-y-2 pl-1">
            {[
              { icon: '🏆', title: 'Best Project of Semester', sub: 'June 2024', color: 'border-os-amber/15', bg: 'rgba(255,184,0,0.03)', glow: 'rgba(255,184,0,0.4)' },
              { icon: '🎖️', title: 'Certificate of Recognition', sub: 'Oct 2024 — Ministry of Communications, Egypt', color: 'border-os-amber/15', bg: 'rgba(255,184,0,0.03)', glow: 'rgba(255,184,0,0.4)' },
            ].map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-start gap-2.5 p-2.5 rounded-lg border ${award.color} hover:border-os-amber/30 transition-colors`}
                style={{ background: award.bg }}
              >
                <span className="text-lg shrink-0" style={{ filter: `drop-shadow(0 0 8px ${award.glow})` }}>{award.icon}</span>
                <div>
                  <p className="text-os-text/90 text-xs font-semibold leading-tight">{award.title}</p>
                  <p className="text-os-muted text-[10px] mt-0.5">{award.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {step >= 4 && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-os-cyan text-[10px]">omar@os</span>
            <span className="text-os-muted text-[10px]">:</span>
            <span className="text-os-cyan text-[10px]">~</span>
            <span className="text-os-text text-[10px]">$</span>
            <TypewriterLine text=" cat stats.json" delay={0} className="text-os-text/70 text-[10px]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
            {[
              { label: 'Projects', value: '3+', color: 'cyan', glow: '0 0 20px rgba(0,212,255,0.3)' },
              { label: 'Skills',   value: '11+', color: 'green', glow: '0 0 20px rgba(0,255,136,0.3)' },
              { label: 'Exp.',     value: '1yr+', color: 'amber', glow: '0 0 20px rgba(255,184,0,0.3)' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className={`flex sm:flex-col items-center justify-between sm:justify-center p-3 rounded-lg border border-os-${stat.color}/12 hover:border-os-${stat.color}/30 transition-all cursor-default overflow-hidden`}
                style={{ background: 'rgba(0,212,255,0.02)' }}
                whileHover={{ boxShadow: stat.glow, scale: 1.02 }}
              >
                <p className={`text-os-${stat.color} text-lg md:text-xl font-bold font-heading`}>{stat.value}</p>
                <p className="text-os-muted text-[9px] tracking-wider uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {step >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mt-6 pt-3 border-t border-os-cyan/8"
        >
          {[
            { href: 'https://www.linkedin.com/in/omarahmed2004/', label: '▸ LinkedIn ↗', cls: 'text-os-cyan border-os-cyan/20 hover:bg-os-cyan/10 hover:border-os-cyan/40' },
            { href: 'https://github.com/omar-ahmed2',           label: '▸ GitHub ↗',   cls: 'text-os-cyan border-os-cyan/20 hover:bg-os-cyan/10 hover:border-os-cyan/40' },
            { href: '/Omar_Ahmed_CV.pdf', download: true,      label: '▸ Download CV ↓', cls: 'text-os-green border-os-green/20 hover:bg-os-green/10 hover:border-os-green/40' },
          ].map(({ href, label, cls, download }) => (
            <motion.a
              key={label}
              href={href}
              {...(download ? { download: true } : { target: '_blank', rel: 'noreferrer' })}
              className={`font-mono text-[10px] transition-all border px-3 py-1.5 rounded-lg cursor-pointer tracking-wider ${cls}`}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              {label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AboutContent;
