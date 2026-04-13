import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    icon: '📁',
    name: 'PORTFOLIO.OS',
    tech: ['React JS', 'Tailwind', 'Three.js', 'TypeScript'],
    desc: 'Interactive personal portfolio with 3D hero section and tabbed skill showcase. 45% increase in session duration through enhanced UI/UX.',
    live: 'https://omar-os-portfolio.vercel.app/',
    github: 'https://github.com/omar-ahmed2/omar-s-os',
    stats: { commits: '120+', stars: '—', status: 'LIVE' },
  },
  {
    icon: '💰',
    name: 'TATAB3NY — تتابعني',
    tech: ['React JS', 'TypeScript', 'Supabase', 'Recharts'],
    desc: 'Personal finance platform for the MENA region featuring Gameeya & asset tracking. 40% improved financial planning efficiency. Real-time dashboards.',
    live: 'https://tatab3ny.vercel.app/',
    github: 'https://github.com/omar-ahmed2/Tatab3ny',
    stats: { commits: '200+', stars: '—', status: 'LIVE' },
  },
  {
    icon: '🤖',
    name: 'CAREERSYNC',
    tech: ['React JS', 'Tailwind', 'TypeScript', 'Gemini AI', 'Recharts'],
    desc: 'AI-powered career tool integrating Google Gemini. Real-time data visualization with Recharts. Supabase PostgreSQL backend.',
    live: 'https://career-sync-beta.vercel.app/',
    github: 'https://github.com/omar-ahmed2/Career-Sync',
    stats: { commits: '150+', stars: '—', status: 'LIVE' },
  },
  {
    icon: '🤖',
    name: 'ELKAWERA',
    tech: ['React JS', 'Tailwind', 'TypeScript', 'Gemini AI', 'Recharts'],
    desc: 'A website for a football academy in Egypt for making appointments and tracking performance and Events.',
    live: 'https://elkawera.vercel.app/',
    github: 'https://github.com/omar-ahmed2/ELKAWERA',
    stats: { commits: '150+', stars: '—', status: 'LIVE' },
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

const ProjectsContent = () => {
  const cmd = useTypewriterSimple('ls ~/projects/', 100);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCards(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="font-mono text-sm">
      {/* Command */}
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-os-cyan text-[10px]">omar@os</span>
        <span className="text-os-muted text-[10px]">:</span>
        <span className="text-os-cyan text-[10px]">~/projects</span>
        <span className="text-os-text text-[10px]">$</span>
        <span className="text-os-text/70 text-[10px] ml-1">
          {cmd.displayed}
          {!cmd.done && <span className="text-os-cyan animate-pulse">█</span>}
        </span>
      </div>

      {cmd.done && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-os-green text-[10px] mb-3">
          ✓ Found {projects.length} repositories
        </motion.div>
      )}

      {showCards && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.12, type: 'spring', stiffness: 250, damping: 22 }}
              className="rounded-lg border border-os-cyan/8 overflow-hidden hover:border-os-cyan/25 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] transition-all duration-300 group"
              style={{ background: 'rgba(0,212,255,0.02)' }}
            >
              {/* Card top bar */}
              <div className="flex items-center justify-between px-3 py-1.5" style={{ background: 'rgba(0,212,255,0.04)', borderBottom: '1px solid rgba(0,212,255,0.06)' }}>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{project.icon}</span>
                  <h3 className="font-heading font-bold text-xs text-os-text group-hover:text-os-cyan transition-colors">
                    {project.name}
                  </h3>
                </div>
                <span className="text-[8px] tracking-wider text-os-green px-1.5 py-0.5 rounded bg-os-green/10 border border-os-green/15">
                  {project.stats.status}
                </span>
              </div>

              <div className="p-3">
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.tech.map(t => (
                    <span key={t} className="px-1.5 py-0.5 text-[8px] rounded border border-os-cyan/12 text-os-cyan/60" style={{ background: 'rgba(0,212,255,0.03)' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-os-text/50 text-[10px] leading-relaxed mb-3">{project.desc}</p>

                {/* Stats row */}
                <div className="flex items-center gap-3 mb-2 text-[9px] text-os-muted/60">
                  <span>commits: {project.stats.commits}</span>
                  <span>|</span>
                  <span>stars: {project.stats.stars}</span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2 border-t border-os-cyan/6">
                  <a href={project.live} className="text-[9px] px-2.5 py-1 rounded border border-os-cyan/15 text-os-cyan/70 hover:text-os-cyan hover:bg-os-cyan/8 hover:border-os-cyan/30 transition-all cursor-pointer tracking-wider">
                    ▸ Live Demo ↗
                  </a>
                  <a href={project.github} className="text-[9px] px-2.5 py-1 rounded border border-os-cyan/15 text-os-cyan/70 hover:text-os-cyan hover:bg-os-cyan/8 hover:border-os-cyan/30 transition-all cursor-pointer tracking-wider">
                    ▸ GitHub ↗
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsContent;
