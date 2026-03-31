import { useState, useEffect } from 'react';

interface TaskbarProps {
  openWindows: string[];
  activeWindow: string | null;
  onWindowClick: (id: string) => void;
}

const Taskbar = ({ openWindows, activeWindow, onWindowClick }: TaskbarProps) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const windowLabels: Record<string, string> = {
    about: 'about',
    projects: 'projects',
    skills: 'skills',
    experience: 'experience',
    contact: 'contact',
    terminal: 'terminal',
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] h-11 flex items-center justify-between px-4 border-t border-os-cyan/10"
      style={{ background: 'rgba(5, 10, 14, 0.92)', backdropFilter: 'blur(20px)' }}>
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-2 px-3 py-1 border-l-2 border-os-cyan mr-3">
          <span className="font-mono text-xs font-bold text-os-cyan text-glow-cyan">OMAR OS</span>
        </div>
        {openWindows.map(id => (
          <button
            key={id}
            onClick={() => onWindowClick(id)}
            className={`font-mono text-xs px-3 py-1 rounded transition-all ${
              activeWindow === id
                ? 'bg-os-cyan/15 text-os-cyan border border-os-cyan/30'
                : 'text-os-muted hover:text-os-text hover:bg-os-cyan/5'
            }`}
          >
            {windowLabels[id] || id}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-os-muted">📡 Cairo, EG</span>
        <span className="font-mono text-xs text-os-cyan">{time}</span>
      </div>
    </div>
  );
};

export default Taskbar;
