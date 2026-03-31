import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  { text: 'OMAR OS v2.0.26 — BOOTING...', delay: 0 },
  { text: '', delay: 200, isProgress: true },
  { text: '', delay: 1200 },
  { text: '[OK] Loading personality...', delay: 1400, ok: true },
  { text: '[OK] Mounting skills...', delay: 1700, ok: true },
  { text: '[OK] Initializing projects...', delay: 2000, ok: true },
  { text: '[OK] Connecting to recruiters...', delay: 2300, ok: true },
  { text: '', delay: 2600 },
  { text: "Welcome, Guest. Type 'help' to get started.", delay: 2800 },
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

    // Progress bar
    const progInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progInterval); return 100; }
        return p + 5;
      });
    }, 50);

    const timer = setTimeout(() => setDone(true), 3500);
    return () => { clearTimeout(timer); clearInterval(progInterval); };
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 500);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: '#050a0e' }}
        >
          <button
            onClick={() => { setDone(true); }}
            className="absolute top-6 right-8 font-mono text-xs text-os-muted hover:text-os-cyan transition-colors"
          >
            [SKIP →]
          </button>
          <div className="font-mono text-sm max-w-xl w-full px-8">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="mb-1">
                {line.isProgress ? (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-3 bg-os-surface rounded-sm overflow-hidden border border-os-cyan/20">
                      <motion.div
                        className="h-full bg-os-cyan"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <span className="text-os-cyan text-xs">{progress}%</span>
                  </div>
                ) : (
                  <span>
                    {line.ok && <span className="text-os-green">[OK] </span>}
                    <span className={line.ok ? 'text-os-text' : 'text-os-cyan'}>
                      {line.ok ? line.text.replace('[OK] ', '') : line.text}
                    </span>
                  </span>
                )}
              </div>
            ))}
            {visibleLines > 0 && <span className="text-os-cyan animate-pulse">█</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
