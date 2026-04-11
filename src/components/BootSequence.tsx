import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  { text: '╔══════════════════════════════════════════╗', delay: 0, style: 'header' },
  { text: '║     OMAR OS v2.0.26 — SYSTEM BOOT       ║', delay: 100, style: 'header' },
  { text: '╚══════════════════════════════════════════╝', delay: 200, style: 'header' },
  { text: '', delay: 400 },
  { text: '', delay: 500, isProgress: true },
  { text: '', delay: 1400 },
  { text: '[    0.001] Kernel loaded successfully', delay: 1500, ok: true },
  { text: '[    0.124] Loading personality module...', delay: 1700, ok: true },
  { text: '[    0.256] Mounting /skills — 11 modules found', delay: 1900, ok: true },
  { text: '[    0.389] Initializing /projects — 3 repositories', delay: 2100, ok: true },
  { text: '[    0.512] Starting networking daemon...', delay: 2300, ok: true },
  { text: '[    0.640] Connecting to recruiters... SIGNAL STRONG ██', delay: 2500, ok: true },
  { text: '', delay: 2700 },
  { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 2800, style: 'divider' },
  { text: "System ready. Welcome, Guest.", delay: 2900, style: 'welcome' },
  { text: "Type 'help' in terminal to get started.", delay: 3100, style: 'hint' },
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    bootLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });

    const progInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progInterval); return 100; }
        return p + 4;
      });
    }, 35);

    const timer = setTimeout(() => setDone(true), 3800);
    return () => { clearTimeout(timer); clearInterval(progInterval); };
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  const getLineStyle = (style?: string) => {
    switch (style) {
      case 'header': return 'text-os-cyan font-bold';
      case 'divider': return 'text-os-cyan/30';
      case 'welcome': return 'text-os-green font-semibold text-sm';
      case 'hint': return 'text-os-muted';
      default: return 'text-os-text/70';
    }
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'brightness(2)' }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: '#050a0e' }}
        >
          {/* CRT vignette effect */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
          }} />
          
          <button
            onClick={() => setDone(true)}
            className="absolute top-6 right-8 font-mono text-xs text-os-muted hover:text-os-cyan transition-colors cursor-pointer z-10 border border-os-cyan/20 px-3 py-1 rounded hover:border-os-cyan/50 hover:bg-os-cyan/5"
          >
            SKIP ▸
          </button>

          <div className="font-mono text-xs max-w-lg w-full px-8 relative">
            {/* Decorative top accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-os-cyan/40 to-transparent mb-6" />
            
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="mb-0.5"
              >
                {line.isProgress ? (
                  <div className="flex items-center gap-3 my-2">
                    <span className="text-os-muted text-[10px] shrink-0">BOOT</span>
                    <div className="flex-1 h-2.5 bg-os-surface rounded-sm overflow-hidden border border-os-cyan/20">
                      <motion.div
                        className="h-full rounded-sm"
                        style={{ background: 'linear-gradient(90deg, #00d4ff, #00ff88)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <span className="text-os-cyan text-[10px] font-bold w-8 text-right">{progress}%</span>
                  </div>
                ) : (
                  <span className={getLineStyle(line.style)}>
                    {line.ok && <span className="text-os-green mr-1">✓</span>}
                    {line.ok ? line.text : line.text}
                  </span>
                )}
              </motion.div>
            ))}
            
            {visibleLines > 0 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                className="text-os-cyan text-sm"
              >
                █
              </motion.span>
            )}

            {/* Decorative bottom accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-os-cyan/20 to-transparent mt-6" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
