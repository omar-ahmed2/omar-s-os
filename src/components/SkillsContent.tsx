import { motion } from 'framer-motion';

const skills = [
  { name: 'HTML5 / CSS3', level: 98 },
  { name: 'JavaScript', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'React.js', level: 90 },
  { name: 'Redux', level: 80 },
  { name: 'Tailwind CSS', level: 98 },
  { name: 'REST APIs', level: 80 },
  { name: 'Socket.IO', level: 65 },
  { name: 'Three.js', level: 60 },
  { name: 'Supabase', level: 65 },
  { name: 'Git', level: 95 },
];

const badges = [
  'React', 'TypeScript', 'Redux', 'Tailwind', 'JavaScript', 'Three.js',
  'Socket.IO', 'Supabase', 'Recharts', 'Vite', 'JWT', 'REST APIs',
  'Git', 'Netlify', 'Vercel', 'Figma',
];

const getBarColor = (level: number) => {
  if (level > 80) return 'bg-os-green';
  if (level >= 60) return 'bg-os-cyan';
  return 'bg-os-amber';
};

const SkillsContent = () => {
  return (
    <div className="font-mono text-sm">
      <div className="mb-4">
        <span className="text-os-cyan">&gt; </span>
        <span className="text-os-muted">scanning skills...</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skill bars */}
        <div className="space-y-2">
          {skills.map((skill, i) => (
            <div key={skill.name} className="flex items-center gap-2">
              <span className="text-os-text/80 text-xs w-28 shrink-0 truncate">{skill.name}</span>
              <div className="flex-1 h-3 bg-os-surface rounded-sm overflow-hidden border border-os-cyan/10">
                <motion.div
                  className={`h-full ${getBarColor(skill.level)} rounded-sm`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                />
              </div>
              <span className="text-os-muted text-[10px] w-8 text-right">{skill.level}%</span>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div>
          <p className="text-os-muted text-xs mb-3 label">TECH STACK</p>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.04 }}
                className="px-2.5 py-1 text-[11px] rounded-full border border-os-cyan/20 text-os-cyan bg-os-cyan/5 hover:bg-os-cyan/10 hover:shadow-[0_0_12px_rgba(0,212,255,0.3)] transition-all cursor-default"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsContent;
