import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootLine {
  text: string;
  delay: number;
  style?: 'header' | 'divider' | 'welcome' | 'hint' | 'pkg' | 'ascii';
  ok?: boolean;
  isProgress?: boolean;
  isPkgInstall?: boolean;
}

const packages = [
  'react@18.3.1', 'typescript@5.8.3', 'tailwindcss@3.4.17', 'framer-motion@10.18',
  'redux@5.0.1', 'vite@5.4.19', 'socket.io@4.7', 'supabase@2.45',
  'three.js@0.167', 'recharts@2.15', 'jwt-decode@4.0',
];

const bootLines: BootLine[] = [
  { text: '┌──────────────────────────────────────────────────┐', delay: 0, style: 'ascii' },
  { text: '│                                                  │', delay: 50, style: 'ascii' },
  { text: '│    ██████╗ ███╗   ███╗ █████╗ ██████╗            │', delay: 100, style: 'header' },
  { text: '│   ██╔═══██╗████╗ ████║██╔══██╗██╔══██╗           │', delay: 130, style: 'header' },
  { text: '│   ██║   ██║██╔████╔██║███████║██████╔╝           │', delay: 160, style: 'header' },
  { text: '│   ██║   ██║██║╚██╔╝██║██╔══██║██╔══██╗           │', delay: 190, style: 'header' },
  { text: '│   ╚██████╔╝██║ ╚═╝ ██║██║  ██║██║  ██║           │', delay: 220, style: 'header' },
  { text: '│    ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝           │', delay: 250, style: 'header' },
  { text: '│                                                  │', delay: 280, style: 'ascii' },
  { text: '│         O M A R   O S  —  v 2 . 0 . 2 6         │', delay: 300, style: 'ascii' },
  { text: '│         Frontend Developer Environment           │', delay: 330, style: 'ascii' },
  { text: '└──────────────────────────────────────────────────┘', delay: 360, style: 'ascii' },
  { text: '', delay: 500 },
  { text: '[BIOS]  Power-on self-test...  OK', delay: 600, ok: true },
  { text: '[BIOS]  Memory check: 16384 MB  OK', delay: 750, ok: true },
  { text: '', delay: 900 },
  { text: '', delay: 950, isProgress: true },
  { text: '', delay: 2000 },
  { text: '', delay: 2100, isPkgInstall: true },
  { text: '', delay: 3400 },
  { text: '[INIT]  Loading kernel modules...', delay: 3500, ok: true },
  { text: '[INIT]  Mounting /home/omar/skills — 11 modules', delay: 3650, ok: true },
  { text: '[INIT]  Mounting /home/omar/projects — 3 repos', delay: 3800, ok: true },
  { text: '[NET ]  Starting network daemon...', delay: 3950, ok: true },
  { text: '[NET ]  Connecting to recruiters... SIGNAL ████', delay: 4100, ok: true },
  { text: '[GPU ]  Rendering engine initialized', delay: 4250, ok: true },
  { text: '[AUTH]  Session started — Guest#' + Math.floor(Math.random() * 9999), delay: 4400, ok: true },
  { text: '', delay: 4600 },
  { text: '════════════════════════════════════════════════════', delay: 4700, style: 'divider' },
  { text: '  System ready. All services operational.', delay: 4800, style: 'welcome' },
  { text: "  Double-click any icon or open terminal.exe", delay: 4950, style: 'hint' },
  { text: '════════════════════════════════════════════════════', delay: 5050, style: 'divider' },
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [installedPkgs, setInstalledPkgs] = useState<number>(0);

  useEffect(() => {
    bootLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });

    // Progress bar animation
    const progInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progInterval); return 100; }
        return p + 3;
      });
    }, 30);

    // Package install simulation
    packages.forEach((_, i) => {
      setTimeout(() => setInstalledPkgs(i + 1), 2200 + i * 100);
    });

    const timer = setTimeout(() => setDone(true), 5600);
    return () => { clearTimeout(timer); clearInterval(progInterval); };
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 500);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  const skip = useCallback(() => setDone(true), []);

  const getLineStyle = (style?: string) => {
    switch (style) {
      case 'header': return 'text-os-cyan font-bold';
      case 'ascii': return 'text-os-cyan/40';
      case 'divider': return 'text-os-cyan/20';
      case 'welcome': return 'text-os-green font-semibold text-sm';
      case 'hint': return 'text-os-muted text-[11px]';
      default: return 'text-os-text/60';
    }
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'brightness(1.5)' }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: '#020508' }}
        >
          {/* CRT vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
          }} />

          {/* Scanlines on boot */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.02) 2px, rgba(0,212,255,0.02) 3px)',
          }} />

          <button
            onClick={skip}
            className="absolute top-5 right-6 font-mono text-[10px] text-os-muted/50 hover:text-os-cyan transition-colors cursor-pointer z-10 border border-os-cyan/10 px-3 py-1 rounded hover:border-os-cyan/30 hover:bg-os-cyan/5 tracking-widest uppercase"
          >
            Skip ▸
          </button>

          <div className="font-mono text-[11px] max-w-2xl w-full px-8 relative leading-relaxed">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.12 }}
                className="mb-px"
              >
                {line.isProgress ? (
                  <div className="flex items-center gap-3 my-3">
                    <span className="text-os-amber text-[9px] tracking-wider shrink-0">LOADING</span>
                    <div className="flex-1 h-2 bg-os-surface/50 rounded-sm overflow-hidden border border-os-cyan/10">
                      <motion.div
                        className="h-full rounded-sm"
                        style={{ background: 'linear-gradient(90deg, #00d4ff, #00ff88)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <span className="text-os-cyan text-[9px] font-bold w-10 text-right">{progress}%</span>
                  </div>
                ) : line.isPkgInstall ? (
                  <div className="my-2 space-y-px">
                    <span className="text-os-amber text-[9px] tracking-wider">INSTALLING DEPENDENCIES</span>
                    <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-px">
                      {packages.slice(0, installedPkgs).map((pkg, j) => (
                        <motion.div
                          key={pkg}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-1.5"
                        >
                          <span className="text-os-green text-[9px]">✓</span>
                          <span className="text-os-text/50 text-[9px]">{pkg}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <span className={getLineStyle(line.style)}>
                    {line.ok && <span className="text-os-green mr-1.5">✓</span>}
                    {line.text}
                  </span>
                )}
              </motion.div>
            ))}

            {visibleLines > 0 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                className="text-os-cyan"
              >
                █
              </motion.span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
