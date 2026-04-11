import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'CODVEDA TECHNOLOGIES',
    location: 'Remote',
    role: 'Frontend Developer Intern',
    period: 'Mar 2026 → Present',
    icon: '🚀',
    status: 'ACTIVE',
    points: [
      'Built responsive SPAs with React.js, Tailwind CSS, Bootstrap, mobile-first',
      'REST API integration, Fetch API, event-driven JavaScript',
      'CI/CD deployment on Netlify & Vercel with lazy loading + asset compression',
    ],
  },
  {
    company: 'DEPI',
    location: 'Cairo, Egypt',
    role: 'Front End Developer',
    period: 'Oct 2024 → Jul 2025',
    icon: '💼',
    status: 'COMPLETED',
    points: [
      'Real-time chat app — Socket.IO, 5,000+ concurrent users, <150ms latency',
      'JWT auth, protected routes, RBAC',
      'Tailwind CSS frontend, Vite + HMR',
    ],
  },
  {
    company: 'AL SAFWA HIGH INSTITUTE',
    location: 'Cairo',
    role: 'Computer Engineering — B.Sc.',
    period: 'Sep 2022 → Present',
    icon: '🎓',
    status: 'IN PROGRESS',
    points: [],
  },
];

const useTypewriterSimple = (text: string, delay: number) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, 20);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  return { displayed, done };
};

const ExperienceContent = () => {
  const cmd = useTypewriterSimple('cat experience.log', 100);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="font-mono text-sm">
      {/* Command */}
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-os-cyan text-[10px]">omar@os</span>
        <span className="text-os-muted text-[10px]">:</span>
        <span className="text-os-cyan text-[10px]">~/experience</span>
        <span className="text-os-text text-[10px]">$</span>
        <span className="text-os-text/70 text-[10px] ml-1">
          {cmd.displayed}
          {!cmd.done && <span className="text-os-cyan animate-pulse">█</span>}
        </span>
      </div>

      {cmd.done && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-os-green text-[10px] mb-3">
          ✓ Loaded {experiences.length} entries
        </motion.div>
      )}

      {showContent && (
        <div className="space-y-3 relative">
          {/* Timeline line */}
          <div className="absolute left-3 top-6 bottom-4 w-px" style={{ background: 'linear-gradient(180deg, rgba(0,212,255,0.3), rgba(0,212,255,0.05))' }} />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-8 group"
            >
              {/* Timeline dot */}
              <div className="absolute left-1 top-3 w-4 h-4 rounded-full border-2 border-os-cyan/40 flex items-center justify-center group-hover:border-os-cyan group-hover:shadow-[0_0_10px_rgba(0,212,255,0.4)] transition-all" style={{ background: '#060e1c' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-os-cyan/50 group-hover:bg-os-cyan transition-colors" />
              </div>

              <div className="rounded border border-os-cyan/8 overflow-hidden hover:border-os-cyan/20 transition-all group-hover:shadow-[0_0_20px_rgba(0,212,255,0.05)]" style={{ background: 'rgba(0,212,255,0.02)' }}>
                {/* Card header */}
                <div className="px-3 py-2 flex items-center justify-between" style={{ background: 'rgba(0,212,255,0.03)', borderBottom: '1px solid rgba(0,212,255,0.06)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{exp.icon}</span>
                    <span className="text-os-cyan font-bold text-xs">{exp.company}</span>
                  </div>
                  <span className={`text-[8px] tracking-wider px-1.5 py-0.5 rounded ${
                    exp.status === 'ACTIVE' ? 'text-os-green bg-os-green/10 border border-os-green/20' :
                    exp.status === 'IN PROGRESS' ? 'text-os-amber bg-os-amber/10 border border-os-amber/20' :
                    'text-os-muted bg-os-muted/10 border border-os-muted/20'
                  }`}>{exp.status}</span>
                </div>

                {/* Card body */}
                <div className="px-3 py-2">
                  <div className="flex items-center justify-between text-[10px] mb-2">
                    <span className="text-os-text/70">{exp.role}</span>
                    <span className="text-os-amber/70">{exp.period}</span>
                  </div>
                  <span className="text-os-muted text-[9px]">📍 {exp.location}</span>

                  {exp.points.length > 0 && (
                    <ul className="mt-2 space-y-1 border-t border-os-cyan/5 pt-2">
                      {exp.points.map((point, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.2 + j * 0.1 + 0.3 }}
                          className="text-os-text/60 text-[10px] flex items-start gap-1.5"
                        >
                          <span className="text-os-green mt-0.5 shrink-0">▸</span>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceContent;
