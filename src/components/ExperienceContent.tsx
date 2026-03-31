import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'CODVEDA TECHNOLOGIES',
    location: 'Remote',
    role: 'Frontend Developer Intern',
    period: 'Mar 2026 → Present',
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
    points: [
      'Real-time chat app — Socket.IO, 5,000+ concurrent users, <150ms latency',
      'JWT auth, protected routes, RBAC',
      'Tailwind CSS frontend, Vite + HMR',
    ],
  },
  {
    company: 'AL SAFWA HIGH INSTITUTE OF ENGINEERING',
    location: 'Cairo',
    role: 'Computer Engineering — B.Sc.',
    period: 'Sep 2022 → Present',
    points: [],
  },
];

const ExperienceContent = () => {
  return (
    <div className="font-mono text-sm">
      <div className="mb-4">
        <span className="text-os-cyan">&gt; </span>
        <span className="text-os-muted">cat experience.log</span>
      </div>

      <div className="space-y-1 relative">
        {/* Timeline line */}
        <div className="absolute left-2 top-4 bottom-4 w-px bg-os-cyan/20" />

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="relative pl-8 pb-4 group"
          >
            {/* Timeline dot */}
            <div className="absolute left-0.5 top-1 w-3 h-3 rounded-full border-2 border-os-cyan bg-os-bg group-hover:shadow-[0_0_10px_rgba(0,212,255,0.5)] transition-shadow" />

            <div className="glass rounded-lg p-4 hover:border-os-cyan/30 transition-all group-hover:scale-[1.01]">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <p className="text-os-cyan font-bold">{exp.company}</p>
                  <p className="text-os-text/80 text-xs">{exp.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-os-muted text-xs">{exp.location}</p>
                  <p className="text-os-amber text-xs">{exp.period}</p>
                </div>
              </div>
              {exp.points.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-os-text/70 text-xs flex items-start gap-2">
                      <span className="text-os-green mt-0.5">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceContent;
