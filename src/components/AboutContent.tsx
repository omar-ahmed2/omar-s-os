import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {/* Separator */}
          <div className="text-os-cyan/20 text-[10px] my-2">╔══════════════════════════════════════════╗</div>

          <div className="pl-2 space-y-1">
            <p className="text-2xl font-heading font-bold text-os-text tracking-wide">OMAR AHMED</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-os-green animate-pulse" style={{ boxShadow: '0 0 6px rgba(0,255,136,0.4)' }} />
              <p className="text-os-cyan text-xs">Frontend Developer & CS Engineering Student</p>
            </div>
          </div>

          <div className="text-os-cyan/20 text-[10px] my-2">╚══════════════════════════════════════════╝</div>

          {/* System info block */}
          <div className="mt-2 rounded border border-os-cyan/8 p-3" style={{ background: 'rgba(0,212,255,0.02)' }}>
            <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-[10px]">
              <span className="text-os-muted">Location:</span>
              <span className="text-os-text/80">Cairo, Egypt 📍</span>
              <span className="text-os-muted">Phone:</span>
              <span className="text-os-text/80">01025891909</span>
              <span className="text-os-muted">Email:</span>
              <span className="text-os-cyan">omarahmedt2460@gmail.com</span>
              <span className="text-os-muted">Status:</span>
              <span className="text-os-green">● Available for hire</span>
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
          <div className="rounded border border-os-cyan/6 p-3 mt-1" style={{ background: 'rgba(0,212,255,0.01)' }}>
            <p className="text-os-text/70 leading-relaxed text-xs">
              Experienced Front-End Developer skilled in React.js, Redux, and API integration.
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
            <div className="flex items-start gap-2 p-2 rounded border border-os-amber/10" style={{ background: 'rgba(255,184,0,0.03)' }}>
              <span className="text-lg" style={{ filter: 'drop-shadow(0 0 8px rgba(255,184,0,0.4))' }}>🏆</span>
              <div>
                <p className="text-os-text/90 text-xs font-semibold">Best Project of Semester</p>
                <p className="text-os-muted text-[10px]">June 2024</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 rounded border border-os-amber/10" style={{ background: 'rgba(255,184,0,0.03)' }}>
              <span className="text-lg" style={{ filter: 'drop-shadow(0 0 8px rgba(255,184,0,0.4))' }}>🎖️</span>
              <div>
                <p className="text-os-text/90 text-xs font-semibold">Certificate of Recognition</p>
                <p className="text-os-muted text-[10px]">Oct 2024 — Ministry of Communications, Egypt</p>
              </div>
            </div>
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
          <div className="grid grid-cols-3 gap-2 mt-1">
            {[
              { label: 'Projects', value: '3+', color: 'cyan' },
              { label: 'Skills', value: '11+', color: 'green' },
              { label: 'Experience', value: '1yr+', color: 'amber' },
            ].map((stat) => (
              <div key={stat.label} className={`text-center p-2 rounded border border-os-${stat.color}/10`} style={{ background: `rgba(0,212,255,0.02)` }}>
                <p className={`text-os-${stat.color} text-lg font-bold font-heading`}>{stat.value}</p>
                <p className="text-os-muted text-[9px] tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {step >= 5 && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 mt-6 pt-3 border-t border-os-cyan/8">
          <a href="https://www.linkedin.com/in/omar-ahmed-" target="_blank" rel="noreferrer"
            className="font-mono text-[10px] text-os-cyan hover:text-os-text transition-all border border-os-cyan/20 px-3 py-1.5 rounded hover:bg-os-cyan/10 hover:border-os-cyan/40 cursor-pointer tracking-wider">
            ▸ LinkedIn ↗
          </a>
          <a href="https://github.com/omar-ahmed" target="_blank" rel="noreferrer"
            className="font-mono text-[10px] text-os-cyan hover:text-os-text transition-all border border-os-cyan/20 px-3 py-1.5 rounded hover:bg-os-cyan/10 hover:border-os-cyan/40 cursor-pointer tracking-wider">
            ▸ GitHub ↗
          </a>
          <a href="/Omar_Ahmed_CV.pdf" download
            className="font-mono text-[10px] text-os-green hover:text-os-text transition-all border border-os-green/20 px-3 py-1.5 rounded hover:bg-os-green/10 hover:border-os-green/40 cursor-pointer tracking-wider">
            ▸ Download CV ↓
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default AboutContent;
