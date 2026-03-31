import { motion } from 'framer-motion';

const projects = [
  {
    icon: '📁',
    name: 'PORTFOLIO.DEV',
    tech: ['React JS', 'Tailwind', 'Three.js', 'TypeScript'],
    desc: 'Interactive personal portfolio with 3D hero section and tabbed skill showcase. 45% increase in session duration through enhanced UI/UX.',
    live: '#',
    github: '#',
  },
  {
    icon: '💰',
    name: 'TATAB3NY — تتابعني',
    tech: ['React JS', 'TypeScript', 'Supabase', 'Recharts'],
    desc: 'Personal finance platform for the MENA region featuring Gameeya & asset tracking. 40% improved financial planning efficiency. Real-time dashboards.',
    live: '#',
    github: '#',
  },
  {
    icon: '🤖',
    name: 'CAREERSYNC',
    tech: ['React JS', 'Tailwind', 'TypeScript', 'Gemini AI', 'Recharts'],
    desc: 'AI-powered career tool integrating Google Gemini. Real-time data visualization with Recharts. Supabase PostgreSQL backend.',
    live: '#',
    github: '#',
  },
];

const ProjectsContent = () => {
  return (
    <div className="font-mono text-sm">
      <div className="mb-4">
        <span className="text-os-cyan">&gt; </span>
        <span className="text-os-muted">ls ~/projects/</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
            className="glass rounded-lg p-4 border-t-2 border-t-os-cyan/40 hover:border-t-os-cyan hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] transition-all duration-300 group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{project.icon}</span>
              <h3 className="font-heading font-bold text-os-text group-hover:text-os-cyan transition-colors">
                {project.name}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tech.map(t => (
                <span key={t} className="px-1.5 py-0.5 text-[9px] rounded border border-os-cyan/15 text-os-cyan/70 bg-os-cyan/5">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-os-text/60 text-xs leading-relaxed mb-3">{project.desc}</p>
            <div className="flex gap-2">
              <a href={project.live} className="text-[10px] px-2 py-1 rounded border border-os-cyan/20 text-os-cyan hover:bg-os-cyan/10 transition-colors">
                Live Demo ↗
              </a>
              <a href={project.github} className="text-[10px] px-2 py-1 rounded border border-os-cyan/20 text-os-cyan hover:bg-os-cyan/10 transition-colors">
                GitHub ↗
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;
