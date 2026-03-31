import { useState, useCallback } from 'react';
import BootSequence from '@/components/BootSequence';
import ParticleBackground from '@/components/ParticleBackground';

import DesktopIcon from '@/components/DesktopIcon';
import Taskbar from '@/components/Taskbar';
import OSWindow from '@/components/OSWindow';
import AboutContent from '@/components/AboutContent';
import SkillsContent from '@/components/SkillsContent';
import ExperienceContent from '@/components/ExperienceContent';
import ProjectsContent from '@/components/ProjectsContent';
import ContactContent from '@/components/ContactContent';
import TerminalContent from '@/components/TerminalContent';
import { useIsMobile } from '@/hooks/use-mobile';

type WindowId = 'about' | 'projects' | 'skills' | 'experience' | 'contact' | 'terminal';

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

const defaultPositions: Record<WindowId, { x: number; y: number }> = {
  about: { x: 180, y: 40 },
  projects: { x: 250, y: 60 },
  skills: { x: 200, y: 80 },
  experience: { x: 300, y: 50 },
  contact: { x: 350, y: 70 },
  terminal: { x: 220, y: 90 },
};

const defaultSizes: Record<WindowId, { width: number; height: number }> = {
  about: { width: 600, height: 480 },
  projects: { width: 750, height: 520 },
  skills: { width: 720, height: 460 },
  experience: { width: 650, height: 500 },
  contact: { width: 500, height: 520 },
  terminal: { width: 650, height: 420 },
};

const icons: { id: WindowId; icon: string; label: string }[] = [
  { id: 'about', icon: '📁', label: 'about.exe' },
  { id: 'projects', icon: '💼', label: 'projects.exe' },
  { id: 'skills', icon: '⚡', label: 'skills.exe' },
  { id: 'experience', icon: '🏢', label: 'experience.exe' },
  { id: 'contact', icon: '📬', label: 'contact.exe' },
  { id: 'terminal', icon: '>_', label: 'terminal.exe' },
];

const Index = () => {
  const [booted, setBooted] = useState(false);
  const [zCounter, setZCounter] = useState(10);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>({
    about: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    projects: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 2 },
    skills: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 3 },
    experience: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 4 },
    contact: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 5 },
    terminal: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 6 },
  });

  const openWindow = useCallback((id: WindowId) => {
    setZCounter(z => z + 1);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: zCounter + 1 },
    }));
    setActiveWindow(id);
  }, [zCounter]);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], isOpen: false, isMinimized: false, isMaximized: false } }));
    setActiveWindow(null);
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], isMinimized: true } }));
    setActiveWindow(null);
  }, []);

  const maximizeWindow = useCallback((id: WindowId) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], isMaximized: !prev[id].isMaximized } }));
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setZCounter(z => z + 1);
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], zIndex: zCounter + 1 } }));
    setActiveWindow(id);
  }, [zCounter]);

  const handleTaskbarClick = useCallback((id: string) => {
    const wid = id as WindowId;
    const win = windows[wid];
    if (!win) return;
    if (win.isMinimized) {
      setZCounter(z => z + 1);
      setWindows(prev => ({ ...prev, [wid]: { ...prev[wid], isMinimized: false, zIndex: zCounter + 1 } }));
      setActiveWindow(wid);
    } else if (activeWindow === wid) {
      minimizeWindow(wid);
    } else {
      focusWindow(wid);
    }
  }, [windows, activeWindow, zCounter, minimizeWindow, focusWindow]);

  const openWindows = Object.entries(windows).filter(([, w]) => w.isOpen).map(([id]) => id);

  const windowContents: Record<WindowId, React.ReactNode> = {
    about: <AboutContent />,
    skills: <SkillsContent />,
    experience: <ExperienceContent />,
    projects: <ProjectsContent />,
    contact: <ContactContent />,
    terminal: <TerminalContent />,
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#050a0e' }}>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      <ParticleBackground />
      <div className="grid-bg fixed inset-0 z-[1]" />
      <div className="scanlines" />
      <div className="noise-overlay" />
      

      {/* Watermark */}
      <div className="fixed inset-0 z-[2] flex items-center justify-center pointer-events-none select-none">
        <span className="font-heading text-[12vw] font-bold text-os-cyan/[0.03] -rotate-[15deg]">
          OMAR.DEV
        </span>
      </div>

      {/* Desktop Icons */}
      {booted && (
        <div className={`fixed z-10 ${isMobile ? 'bottom-16 left-0 right-0 flex justify-center gap-2 px-2' : 'left-4 top-8 flex flex-col gap-1'}`}>
          {icons.map((icon, i) => (
            <DesktopIcon
              key={icon.id}
              icon={icon.icon}
              label={icon.label}
              onClick={() => openWindow(icon.id)}
              delay={i * 0.1}
            />
          ))}
        </div>
      )}

      {/* Windows */}
      {booted && (
        <div className="fixed inset-0 z-20 pointer-events-none">
          {(Object.keys(windows) as WindowId[]).map(id => (
              <OSWindow
                key={id}
                id={id}
                title={id}
                isOpen={windows[id].isOpen}
                isMinimized={windows[id].isMinimized}
                isMaximized={windows[id].isMaximized}
                zIndex={windows[id].zIndex}
                onClose={() => closeWindow(id)}
                onMinimize={() => minimizeWindow(id)}
                onMaximize={() => maximizeWindow(id)}
                onFocus={() => focusWindow(id)}
                defaultPosition={defaultPositions[id]}
                defaultSize={defaultSizes[id]}
              >
                {windowContents[id]}
              </OSWindow>
            ))}
        </div>
      )}

      {/* Taskbar */}
      {booted && (
        <Taskbar
          openWindows={openWindows}
          activeWindow={activeWindow}
          onWindowClick={handleTaskbarClick}
        />
      )}
    </div>
  );
};

export default Index;
