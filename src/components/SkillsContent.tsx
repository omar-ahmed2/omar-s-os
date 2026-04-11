import { useState, useEffect } from 'react';
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
  if (level > 80) return { bar: 'bg-os-green', glow: 'rgba(0,255,136,0.3)' };
  if (level >= 60) return { bar: 'bg-os-cyan', glow: 'rgba(0,212,255,0.3)' };
  return { bar: 'bg-os-amber', glow: 'rgba(255,184,0,0.3)' };
};

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

const SkillsContent = () => {
  const [showBars, setShowBars] = useState(false);
  const cmd = useTypewriterSimple('scanning skill modules...', 100);

  useEffect(() => {
    const t = setTimeout(() => setShowBars(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="font-mono text-sm">
      {/* Command prompt */}
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-os-cyan text-[10px]">omar@os</span>
        <span className="text-os-muted text-[10px]">:</span>
        <span className="text-os-cyan text-[10px]">~/skills</span>
        <span className="text-os-text text-[10px]">$</span>
        <span className="text-os-text/70 text-[10px] ml-1">
          {cmd.displayed}
          {!cmd.done && <span className="text-os-cyan animate-pulse">█</span>}
        </span>
      </div>

      {cmd.done && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-os-green text-[10px] mb-3">
          ✓ Found {skills.length} skill modules
        </motion.div>
      )}

      {showBars && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Skill bars */}
          <div className="space-y-1.5">
            <div className="text-[9px] text-os-muted tracking-widest uppercase mb-2 flex items-center gap-2">
              <span>PROFICIENCY LEVELS</span>
              <div className="flex-1 h-px bg-os-cyan/10" />
            </div>
            {skills.map((skill, i) => {
              const color = getBarColor(skill.level);
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-2 group"
                >
                  <span className="text-os-text/70 text-[10px] w-24 shrink-0 truncate group-hover:text-os-cyan transition-colors">
                    {skill.name}
                  </span>
                  <div className="flex-1 h-2.5 bg-os-surface/60 rounded-sm overflow-hidden border border-os-cyan/8">
                    <motion.div
                      className={`h-full ${color.bar} rounded-sm`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.4 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span className="text-os-muted text-[9px] w-8 text-right font-semibold">{skill.level}%</span>
                </motion.div>
              );
            })}
          </div>

          {/* Badges */}
          <div>
            <div className="text-[9px] text-os-muted tracking-widest uppercase mb-2 flex items-center gap-2">
              <span>TECH STACK</span>
              <div className="flex-1 h-px bg-os-cyan/10" />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {badges.map((badge, i) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.04, type: 'spring', stiffness: 300 }}
                  className="px-2 py-1 text-[10px] rounded border border-os-cyan/15 text-os-cyan/80 hover:text-os-cyan hover:bg-os-cyan/8 hover:border-os-cyan/30 hover:shadow-[0_0_12px_rgba(0,212,255,0.2)] transition-all cursor-default"
                  style={{ background: 'rgba(0,212,255,0.03)' }}
                >
                  {badge}
                </motion.span>
              ))}
            </div>

            {/* Stats summary */}
            <div className="mt-4 p-3 rounded border border-os-cyan/8" style={{ background: 'rgba(0,212,255,0.02)' }}>
              <div className="text-[9px] text-os-muted tracking-widest uppercase mb-2">SUMMARY</div>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-os-muted">Expert (90%+):</span>
                  <span className="text-os-green">{skills.filter(s => s.level >= 90).length} skills</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-os-muted">Advanced (70-89%):</span>
                  <span className="text-os-cyan">{skills.filter(s => s.level >= 70 && s.level < 90).length} skills</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-os-muted">Intermediate:</span>
                  <span className="text-os-amber">{skills.filter(s => s.level < 70).length} skills</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsContent;
